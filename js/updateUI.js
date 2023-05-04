import * as currentUser from "./displayCurrentAcc.js";
import * as chart from "./chart.js";
import * as transactions from "./transactions.js";
import * as profile from "./profile.js";
import * as spin from "./spinWheel.js";

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
  currentUser.displayTransactionsOverview(currentAccount);
  currentUser.displayTransactionsTransaction(currentAccount);
  // chart.chartDisplay(currentAccount);
};

export const updateBalance = function (currentAccount) {
  let amounts = [];

  currentAccount.transactions.forEach((t) => amounts.push(t.amount));

  currentAccount.balance = amounts.reduce(function (acc, cur) {
    return acc + cur;
  }, 0);

  transactionsBalance.textContent = `${currentAccount.balance}$`;
  overviewBalance.textContent = `${currentAccount.balance}$`;
  spinwinBalance.textContent = `${currentAccount.balance}$`;
};
