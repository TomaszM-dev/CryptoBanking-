// query selector
import * as chart from "./chart.js";

const transactionsContainer = document.querySelector(
  ".overview__transactionContainer"
);
const accountNumber = document.querySelector(".card__inner-accountNumber");
const accountHolder = document.querySelector(".card__inner-holder");
const accountValid = document.querySelector(".card__inner-validTo");
const accountCvv = document.querySelector(".card__inner-cvv");
const accountBalance = document.querySelector(".overview__balance");
const chartContainer = document.querySelector(".overview__chart");

// create date
export const dateCreator = function (date) {
  const day = new Date(date).getDay();
  const month = new Date(date).getMonth() + 1;
  const year = new Date(date).getFullYear();
  const fullDate = day + "/" + month + "/" + year;
  return fullDate;
};

// display transactions
export const currentTransactionsAmount = [200, 1200];

export const displayTransactions = function (currentAccount) {
  transactionsContainer.innerHTML = "";

  currentAccount.transactions.forEach((t) => {
    const html = `
    <div class="overview__transaction">
      <div class="overview__transaction-icon">
      <i class="fa-brands fa-spotify"></i>
      </div>
      <div class="overview__transaction-content">
        <p class="overview__transaction-name">${t.company}</p>
        <p class="overview__transaction-type">${t.category}</p>
      </div>
      <div class="overview__transaction-date">${dateCreator(t.date)}</div>
      <div class="overview__transaction-price">${t.amount}$</div>
    </div>
   
    `;

    transactionsContainer.insertAdjacentHTML("afterbegin", html);
  });
};

accountNumber.innerHTML = "";

// display card details
export const displayCardDetails = function (currentAccount) {
  const set1 = currentAccount.cardNumber.toString().slice(0, 4);
  const set2 = currentAccount.cardNumber.toString().slice(4, 8);
  const set3 = currentAccount.cardNumber.toString().slice(8, 12);
  const set4 = currentAccount.cardNumber.toString().slice(12, 16);
  const cardArray = [set1, set2, set3, set4];

  const html = `${cardArray[0]} <span></span> ${cardArray[1]} 
  <span></span> ${cardArray[2]} <span></span> ${cardArray[3]} `;

  accountValid.textContent = currentAccount.validTill;
  accountBalance.textContent = `${currentAccount.balance} $`;
  accountNumber.insertAdjacentHTML("afterbegin", html);
  accountCvv.textContent = currentAccount.ccv;
  accountHolder.textContent = currentAccount.fullName;
};
