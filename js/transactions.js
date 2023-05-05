import * as acc from "./accounts.js";
import { loadCurrencies } from "./currenciesPanel.js";
import * as update from "./updateUI.js";
import * as switchPage from "./switchPages.js";

// query selectors
const transactionsOverlay = document.querySelector(".transactions__overlay");
const pageLoadingHeadline = document.querySelector(".loading-page__headline");

// transfer
const transferBtn = document.querySelector(".transactions__button-transfer");
const transferToInput = document.querySelector(".transactions__input-to");
const transferToAmount = document.querySelector(".transactions__input-amount");
const transferToCvv = document.querySelector(".transactions__input-cvv");
const transferPopupContainer = document.querySelector(
  ".transfer__popupContainer"
);
// amount
const loanButton = document.querySelector(".transactions__button-loan");
const loanAmount = document.querySelector(".transactions__input-loan");
const loanPopupContainer = document.querySelector(".loan__popupContainer");

// delete acc
const deleteUser = document.querySelector(".transactions__input-user");
const deletePass = document.querySelector(".transactions__input-password");
const deletePopupContainer = document.querySelector(".delete__popupContainer");
const deleteButton = document.querySelector(".transactions__button-close");

export const transactions = function (currentAccount) {
  console.log(currentAccount);
  const openPopupTransfer = function (headline, info) {
    const markup = `
  <div class="transactions__popup open">
  <div class="transactions__popup-wrong open ">
  <button class="transactions__popup-close">X</button>
  <h3 class="transactions__popup-headline mg-sm">
  ${headline}
  </h3>
  <p class="transactions__popup-info">
  ${info}
  </p>
  </div>
  </div>
  `;
    transactionsOverlay.classList.remove("hide");

    transferPopupContainer.insertAdjacentHTML("afterbegin", markup);
  };
  let transferUser;

  const openPopupLoan = function (headline, info) {
    const markup = `
    <div class="transactions__popup open">
    <div class="transactions__popup-wrong open ">
    <button class="transactions__popup-close">X</button>
    <h3 class="transactions__popup-headline mg-sm">
    ${headline}
    </h3>
    <p class="transactions__popup-info">
    ${info}
    </p>
    </div>
    </div>
    `;
    transactionsOverlay.classList.remove("hide");

    loanPopupContainer.insertAdjacentHTML("afterbegin", markup);
  };
  const openPopupDelete = function (headline, info) {
    const markup = `
    <div class="transactions__popup open">
    <div class="transactions__popup-wrong open ">
    <button class="transactions__popup-close">X</button>
    <h3 class="transactions__popup-headline mg-sm">
    ${headline}
    </h3>
    <p class="transactions__popup-info">
    ${info}
    </p>
    </div>
    </div>
    `;
    transactionsOverlay.classList.remove("hide");

    deletePopupContainer.insertAdjacentHTML("afterbegin", markup);
  };

  const transferTo = function (e) {
    e.preventDefault();

    // all inputs must be field
    if (
      transferToInput.value === "" ||
      transferToAmount.value === "" ||
      transferToCvv.value === ""
    ) {
      const headline = "Try again";
      const info = "All imputs must be filled";
      transactionsOverlay.classList.remove("hide");
      openPopupTransfer(headline, info);
    } else {
    }

    transferUser = acc.accounts.find(
      (acc) => acc.userName === transferToInput.value
    );

    // wrong username
    if (transferUser === undefined) {
      const headline = "Wrong Username";
      const info = "There is no this username in data base";
      transactionsOverlay.classList.remove("hide");
      openPopupTransfer(headline, info);
      return;
    }

    // amount too high
    if (currentAccount.balance < transferToAmount.value) {
      const headline = "Invalid Amount";
      const info = "You dont have enougth money on bank account";
      transactionsOverlay.classList.remove("hide");
      openPopupTransfer(headline, info);
      return;
    }

    // wrong cvv
    if (Number(currentAccount.ccv) !== Number(transferToCvv.value)) {
      const headline = "Invalid Cvv";
      const info = "Check your card cvv and try again";
      transactionsOverlay.classList.remove("hide");
      openPopupTransfer(headline, info);

      return;
    }

    // transfer succesfull

    let newDepositTransaction;
    let newWithdrawalTransaction;

    newDepositTransaction = {
      type: "deposit",
      amount: +transferToAmount.value,
      date: new Date().toISOString(),
      category: "Transfer",
      company: "Cryptobank",
    };

    newWithdrawalTransaction = {
      type: "withdrawal",
      amount: -transferToAmount.value,
      date: new Date().toISOString(),
      category: "Transfer",
      company: "Cryptobank",
    };

    currentAccount.transactions.push(newWithdrawalTransaction);
    transferUser.transactions.push(newDepositTransaction);

    update.updateUI(currentAccount);
    console.log(currentAccount);

    // clear input fields
    transferToInput.value = transferToCvv.value = transferToAmount.value = "";
  };

  transferBtn.addEventListener("click", transferTo);

  // closing popup on click
  document.addEventListener("click", function (e) {
    const target = e.target.closest(".transactions__popup-close");

    if (target) {
      transferPopupContainer.innerHTML = "";
      deletePopupContainer.innerHTML = "";
      loanPopupContainer.innerHTML = "";
      transactionsOverlay.classList.add("hide");
    }
  });

  // closing popup on background

  transactionsOverlay.addEventListener("click", function (e) {
    transferPopupContainer.innerHTML = "";
    loanPopupContainer.innerHTML = "";
    deletePopupContainer.innerHTML = "";

    transactionsOverlay.classList.add("hide");
  });

  // closing popup on keystroke

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      transferPopupContainer.innerHTML = "";
      loanPopupContainer.innerHTML = "";
      deletePopupContainer.innerHTML = "";
      transactionsOverlay.classList.add("hide");
    }
  });

  // loan function
  const loan = function (e) {
    e.preventDefault();

    const loanA = Number(loanAmount.value);

    if (loanAmount.value === "" || currentAccount.balance * 0.8 < loanA) {
      const headline = "Invalid Amount ";
      const info = "Please try again";
      transactionsOverlay.classList.remove("hide");
      openPopupLoan(headline, info);
    }

    let loanTransaction;

    if (loanA > 0 && currentAccount.balance * 0.8 > loanA) {
      setTimeout(() => {
        loanTransaction = {
          type: "deposit",
          amount: loanA,
          date: new Date().toISOString(),
          category: "Loan",
          company: "Cryptobank",
        };

        currentAccount.transactions.push(loanTransaction);
        update.updateUI(currentAccount);
        update.updateBalance(currentAccount);
      }, 1000);

      console.log(currentAccount.balance);
    }
  };

  loanButton.addEventListener("click", loan);

  const deleteUserAcc = function (e) {
    e.preventDefault();

    const user = deleteUser.value;
    const password = deletePass.value;

    if (user === "" || password === "") {
      const headline = "Try again";
      const info = "All inputs must be filled";
      transactionsOverlay.classList.remove("hide");
      openPopupDelete(headline, info);
    }

    if (
      user === currentAccount.userName &&
      password === currentAccount.password
    ) {
      const index = acc.accounts.findIndex((acc) => acc.userName === user);
      acc.accounts.splice(index, 1);
      switchPage.switchToStarterPage();
      pageLoadingHeadline.textContent = "Deleting Account...";
    } else {
      const headline = "Error";
      const info = "Wrong credentials. Please try again";
      transactionsOverlay.classList.remove("hide");
      openPopupDelete(headline, info);
    }
  };

  deleteButton.addEventListener("click", deleteUserAcc);
};
