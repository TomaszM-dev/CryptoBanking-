import * as con from "./config.js";
import * as loadCurr from "./currenciesPanel.js";
import * as switchPages from "./switchPages.js";
import * as dateC from "./displayCurrentAcc.js";

const dropList = document.querySelectorAll(".check-pairs__select ");
const exchangeRateBtn = document.querySelector(".check-pairs__button");
const amount = document.querySelector(".check-pairs__input");
const fromCurrency = document.querySelector(".select__from");
const toCurrency = document.querySelector(".select__to");
const exchangeRateText = document.querySelector(".check-pairs__exchangeRate");
const exchangeIcon = document.querySelector(".check-pairs__icon");
const flagContainer = document.querySelector(".check-pairs__selectionBox");

dropList.innerHTML = "";

// taking data from config and storing to variable
let countries = con.country_list;

// creating options on selection based on countries array
for (let i = 0; i < dropList.length; i++) {
  for (let country in countries) {
    let selected;

    if (i == 0) {
      selected = country == "USD" ? "selected" : "";
    } else if (i == 1) {
      selected = country == "PLN" ? "selected" : "";
    }
    let markup = `
    <option value="${country}" class="check-pairs__option" ${selected}>${country}</option>
    `;

    dropList[i].insertAdjacentHTML("beforeend", markup);
  }

  // loading flags on change
  dropList[i].addEventListener("change", function (e) {
    e.preventDefault();

    loadFlag(e.target);
  });
}

// loading flag mechanics
function loadFlag(element) {
  for (let flag in con.country_list) {
    if (flag === element.value) {
      // const markup = `<span class="fi fi-${countries[flag]} check-pairs__flag"></span>
      // `;

      // flagContainer.insertAdjacentHTML("afterbegin", markup);

      let img = element.parentElement.querySelector("img");
      img.src = `https://flagsapi.com/${con.country_list[flag]}/flat/64.png`;
    } else return;
  }
}

// loading currencies that are selected and fetching right api for them

const loadCurrencies = async function (fromValue, amountValue) {
  const res = await fetch(
    ` https://v6.exchangerate-api.com/v6/e2d92976bd296389d528aaa2/latest/${fromValue}`
  );

  const data = await res.json();

  if (!res.ok) throw new Error(`${data.message}`);

  let exchangeRate = data.conversion_rates[toCurrency.value];

  let totalExchangeRate = exchangeRate * amountValue;

  exchangeRateText.innerHTML = `${amountValue} ${fromValue} = ${totalExchangeRate.toFixed(
    3
  )} ${toCurrency.value}`;
};

//
const getExchangeRate = function () {
  exchangeRateText.innerHTML = "Getting exchange rate...";
  let amountValue = amount.value;

  if (amountValue == 0 || amountValue == "") {
    amount.value = 1;
    amountValue = 1;
  }
  loadCurrencies(fromCurrency.value, amountValue);
};

// create last 7 days
function getWeekDays(locale) {
  const baseDate = new Date();
  const weekDays = [];
  const days = [];
  for (let i = 0; i < 7; i++) {
    weekDays.push(baseDate.toLocaleDateString(locale, { weekday: "long" }));
    baseDate.setDate(baseDate.getDate() - 1);

    days.push(loadCurr.formatDate(baseDate));
  }

  return days;
}
const weekDays = getWeekDays("en-US");

// fetch last 7 days depended upon results from get week days function
const ratePrices = async function () {
  let prices = [];
  for (let day of weekDays) {
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/e2d92976bd296389d528aaa2/history/${fromCurrency.value}/${day}`
    );

    const data = await res.json();

    let exchangeRate = data.conversion_rates[toCurrency.value];
    prices.push(exchangeRate);
  }

  return prices;
};

async function run() {
  let price = await ratePrices();
}

run();

//setup chart block
const data = {
  labels: weekDays,
  datasets: [
    {
      label: "# of Amount",
      data: await ratePrices(),
      borderWidth: 1,
      borderColor: "#01a001",
      backgroundColor: "#01a001",
    },
  ],
};

// config block
const config = {
  type: "line",
  data,
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  },
};

//init block
let myChart = new Chart(document.getElementById("check-pairs__chart"), config);

// destroy chart
let destroyChart = function () {
  myChart.destroy();
  myChart.data.datasets[0].data = [];
};

// render chart again
let renderChart = function () {
  myChart = new Chart(document.getElementById("check-pairs__chart"), config);
  async function run() {
    await ratePrices();

    myChart.data.datasets[0].data.push(...(await ratePrices()));
    myChart.update();
  }
  run();
};

// event handlers
exchangeRateBtn.addEventListener("click", function (e) {
  e.preventDefault();
  getExchangeRate();
  destroyChart();

  renderChart();
});

window.addEventListener("load", function (e) {
  e.preventDefault();
  getExchangeRate();
});

exchangeIcon.addEventListener("click", function () {
  let reverseCurr = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = reverseCurr;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeRate();
});
