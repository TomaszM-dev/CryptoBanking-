import * as currentUser from "./displayCurrentAcc.js";
// import * as chart from "./chart.js";
import * as transactions from "./transactions.js";
import * as profile from "./profile.js";
import * as spin from "./spinWheel.js";
import * as acc from "./accounts.js";

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
};

export const updateUI = function (currentAccount) {
  destroyChart();
  renderChart();
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

let currentAccount;

currentAccount = acc.accounts.find((acc) => acc.userName === "admin");

console.log(currentAccount);

let dataArr = [];
let labelsArr = [];

currentAccount.transactions.forEach((t) => {
  const dateReady = currentUser.dateCreator(t.date);
  labelsArr.push(dateReady);
  dataArr.push(t.amount);
});

// setup chart block
const data = {
  labels: labelsArr,
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

// init block
let chart = new Chart(document.getElementById("chart"), config);

// destroy chart
export let destroyChart = function () {
  chart.destroy();
  chart.data.datasets[0].data = [];
  chart.data.labels = [];
  labelsArr = [];
  dataArr = [];
};

// render chart again
let renderChart = function () {
  chart = new Chart(document.getElementById("chart"), config);

  currentAccount.transactions.forEach((t) => {
    const dateReady = currentUser.dateCreator(t.date);
    labelsArr.push(dateReady);

    dataArr.push(t.amount);
    chart.data.datasets[0].data = dataArr;
    chart.data.labels = labelsArr;
    chart.update();
  });
};

// chart needs to be displayed when currenct account is set ( when user is logged in )

// then chart need to update it self when new transaction is added

// new transaction must be displayed on chart with the amount of transaction and date of it.
