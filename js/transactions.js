import * as acc from "./accounts.js";

// query selectors
// transfer
const transferBtn = document.querySelector(".transactions__button-transfer");
const transferToInput = document.querySelector(".transactions__input-to");
const transferToAmount = document.querySelector(".transactions__input-amount");
const transferToCvv = document.querySelector(".transactions__input-cvv");
const transactionsPopupContainer = document.querySelector(
  ".transactions__popupContainer"
);
const transactionsOverlay = document.querySelector(".transactions__overlay");
const transactionsBalance = document.querySelector(".transactions__balance");

export const transactions = function (currentAccount) {
  transactionsBalance.textContent = `${currentAccount.balance}$`;
  console.log(transactionsBalance.textContent);

  console.log(currentAccount);

  const openPopup = function (headline, info) {
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

    transactionsPopupContainer.insertAdjacentHTML("afterbegin", markup);
  };
  let transferUser;

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
      transactionsOverlay.classList.remove("hidden");
      openPopup(headline, info);
    } else {
    }

    transferUser = acc.accounts.find(
      (acc) => acc.userName === transferToInput.value
    );

    // wrong username
    if (transferUser === undefined) {
      const headline = "Wrong Username";
      const info = "There is no this username in data base";
      transactionsOverlay.classList.remove("hidden");
      openPopup(headline, info);
    }

    // amount too high
    if (currentAccount.balance < transferToAmount.value) {
      const headline = "Invalid Amount";
      const info = "You dont have enougth money on bank account";
      transactionsOverlay.classList.remove("hidden");
      openPopup(headline, info);
    }

    // clear input fields
    transferToInput.value = transferToCvv.value = transferToAmount.value = "";
  };

  transferBtn.addEventListener("click", transferTo);

  // closing popup on click
  document.addEventListener("click", function (e) {
    const target = e.target.closest(".transactions__popup-close");

    if (target) {
      transactionsPopupContainer.innerHTML = "";
      transactionsOverlay.classList.add("hidden");
    }
  });

  // closing popup on background

  transactionsOverlay.addEventListener("click", function (e) {
    transactionsPopupContainer.innerHTML = "";
    transactionsOverlay.classList.add("hidden");
  });

  // closing popup on keystroke

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      transactionsPopupContainer.innerHTML = "";
      transactionsOverlay.classList.add("hidden");
    }
  });
};
