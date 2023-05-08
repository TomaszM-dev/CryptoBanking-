import * as currentUser from "./displayCurrentAcc.js";

import * as transactions from "./transactions.js";
import * as profile from "./profile.js";
import * as spin from "./spinWheel.js";
import * as acc from "./accounts.js";
import * as switchSection from "./switchSections.js";
import * as curPanel from "./currenciesPanel.js";
import * as curConverter from "./currenciesConverter.js";

const transactionsBalance = document.querySelector(".transactions__balance");
const overviewBalance = document.querySelector(".overview__balance");
const spinwinBalance = document.querySelector(".spin-win__balance");

export const initSettings = function (currentAccount) {
  currentUser.displayTransactionsOverview(currentAccount);
  currentUser.displayTransactionsTransaction(currentAccount);
  currentUser.displayCardDetails(currentAccount);
  transactions.transactions(currentAccount);
  profile.profileSettings(currentAccount);
  updateBalance(currentAccount);
  spin.spin(currentAccount);
  initChart(currentAccount);
};

export const updateUI = function (currentAccount) {
  destroy(chartUI);
  render(currentAccount, chartUI);
  currentUser.displayTransactionsOverview(currentAccount);
  currentUser.displayTransactionsTransaction(currentAccount);
};

export const updateBalance = function (currentAccount) {
  console.log(currentAccount);
  let amounts = [];

  currentAccount.transactions.forEach((t) => amounts.push(t.amount));

  currentAccount.balance = amounts.reduce(function (acc, cur) {
    return acc + cur;
  }, 0);

  transactionsBalance.textContent = `${currentAccount.balance}$`;
  overviewBalance.textContent = `${currentAccount.balance}$`;
  spinwinBalance.textContent = `${currentAccount.balance}$`;
};

////////////////////////////////////

let labelArr = [];
let dataArr = [];

let data = {
  labels: labelArr,
  datasets: [
    {
      data: dataArr,
      label: "# of Amount",
      borderWidth: 1,
      borderColor: "#01a001",
      backgroundColor: "#01a001",
    },
  ],
};

let config = {
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

function initChart(currentAccount) {
  currentAccount.transactions.forEach((t) => {
    const dateReady = currentUser.dateCreator(t.date);
    labelArr.push(dateReady);
    dataArr.push(t.amount);
  });
}

let chartUI = new Chart(document.getElementById("chart"), config);

function destroy(chartUI) {
  chartUI.data.datasets[0].data = [];
  chartUI.data.labels = [];
  labelArr = [];
  dataArr = [];
  chartUI.destroy();
}

function render(currentAccount, chartUI) {
  chartUI = new Chart(document.getElementById("chart"), config);

  currentAccount.transactions.forEach((t) => {
    const dateReady = currentUser.dateCreator(t.date);
    labelArr.push(dateReady);
    dataArr.push(t.amount);

    chartUI.data.datasets[0].data = dataArr;
    chartUI.data.labels = labelArr;
  });
  chartUI.update();
}
