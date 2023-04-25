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

exchangeIcon.addEventListener("click", function () {
  let reverseCurr = fromCurrency.value;

  fromCurrency.value = toCurrency.value;
  toCurrency.value = reverseCurr;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeRate();
});

dropList.innerHTML = "";
let countries = con.country_list;

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
  dropList[i].addEventListener("change", function (e) {
    e.preventDefault();

    loadFlag(e.target);
  });
}

const loadFlag = function (element) {
  for (let flag in config.country_list) {
    if (flag == element.value) {
      let img = element.parentElement.querySelector("img");
      img.src = `https://flagsapi.com/${config.country_list[flag]}/flat/64.png`;
    }
  }
};

function getWeekDays(locale) {
  const baseDate = new Date();
  const weekDays = [];
  const days = [];
  for (let i = 0; i < 7; i++) {
    weekDays.push(baseDate.toLocaleDateString(locale, { weekday: "long" }));
    baseDate.setDate(baseDate.getDate() - 1);

    days.push(loadCurr.formatDate(baseDate));
  }
  console.log(weekDays);
  return days;
}

const weekDays = getWeekDays("en-US");

const loadCurrencies = async function (fromValue, amountValue) {
  const res = await fetch(
    ` https://v6.exchangerate-api.com/v6/619f54c3a77115dd5d7d53d8/latest/${fromValue}`
  );

  const data = await res.json();

  if (!res.ok) throw new Error(`${data.message}`);

  let exchangeRate = data.conversion_rates[toCurrency.value];

  let totalExchangeRate = exchangeRate * amountValue;

  exchangeRateText.innerHTML = `${amountValue} ${fromValue} = ${totalExchangeRate.toFixed(
    3
  )} ${toCurrency.value}`;
};

const getExchangeRate = function () {
  exchangeRateText.innerHTML = "Getting exchange rate...";
  let amountValue = amount.value;

  if (amountValue == 0 || amountValue == "") {
    amount.value = 1;
    amountValue = 1;
  }
  loadCurrencies(fromCurrency.value, amountValue);
};

window.addEventListener("load", function (e) {
  e.preventDefault();
  getExchangeRate();
});

let destroyChart = function () {
  myChart.destroy();
};

let renderChart = function () {
  let myChart = new Chart(
    document.getElementById("check-pairs__chart"),
    config
  );
};

exchangeRateBtn.addEventListener("click", function (e) {
  e.preventDefault();
  getExchangeRate();

  ratePrices().catch(essa);
});

const ratePrices = async function () {
  let prices = [];
  for (let day of weekDays) {
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/619f54c3a77115dd5d7d53d8/history/${fromCurrency.value}/${day}`
    );

    const data = await res.json();

    let exchangeRate = data.conversion_rates[toCurrency.value];
    prices.push(exchangeRate);
  }

  return prices;
};

ratePrices().catch(price);

//setup chart block
const data = {
  labels: weekDays,
  datasets: [
    {
      label: "# of Votes",
      data: ratePrices(),
      borderWidth: 1,
    },
  ],
};

// config block
const config = {
  type: "line",
  data,
  options: {
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  },
};

//init block
const myChart = new Chart(
  document.getElementById("check-pairs__chart"),
  config
);
let price = await [];
