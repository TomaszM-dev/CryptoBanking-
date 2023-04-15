import { chart } from "./chart.js";
import { loginMechanics } from "./loginMechanics.js";
import { registerMechanics } from "./registerMechanics.js";
import * as switchPages from "./switchPages.js";
import * as apiRequests from "./apiRequests.js";

chart();
loginMechanics();
registerMechanics();

//////////////////////////

//////////////////////////////////////////////////////////
const now = new Date();

const dateCreator = function (date) {
  const day = new Date(date).getDay();
  const month = new Date(date).getMonth() + 1;
  const year = new Date(date).getFullYear();
  const fullDate = day + "/" + month + "/" + year;
  console.log(fullDate);
};

// const accountNumber = document.querySelector(".card__inner-accountNumber");
// const accountHolder = document.querySelector(".card__inner-holder");
// const accountValid = document.querySelector(".card__inner-validTo");
// const accountCvv = document.querySelector(".card__inner-cvv");
// const accountBalance = document.querySelector(".overview__balance");

// currentAccount = userMark;

// let currentTransactions = [];

// currentAccount.transactions.forEach((trans) => {
//   currentTransactions.push(trans);
// });
