//query selectors
import * as switchPages from "./switchPages.js";
import * as acc from "./accounts.js";
import * as currentUser from "./displayCurrentAcc.js";
import * as chart from "./chart.js";

const pageLoadingHeadline = document.querySelector(".loading-page__headline");
const signInButton = document.querySelector(".btn__login");
const userNameInput = document.querySelector(".sign-in__username");
const passwordInput = document.querySelector(".sign-in__password");
const popupHeadline = document.querySelector(".wrong-password__headline");

let currentAccount;

export const loginMechanics = function () {
  signInButton.addEventListener("click", function (e) {
    e.preventDefault();

    currentAccount = acc.accounts.find(
      (acc) => acc.userName === userNameInput.value
    );

    if (currentAccount === undefined) {
      switchPages.openPopup();
      popupHeadline.textContent = "Wrong Username";
      return;
    }

    if (currentAccount.password === passwordInput.value) {
      currentUser.displayTransactions(currentAccount);
      currentUser.displayCardDetails(currentAccount);
      switchPages.switchToMainPage();
      chart.chartDisplay(currentAccount);

      pageLoadingHeadline.textContent = "Loggin in...";
      userNameInput.value = passwordInput.value = "";
    } else {
      switchPages.openPopup();
      popupHeadline.textContent = "Wrong Password";
    }
  });
};
