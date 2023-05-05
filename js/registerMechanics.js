import * as switchPages from "./switchPages.js";
import * as acc from "./accounts.js";
import * as update from "./updateUI.js";

// query  selectors
const pageLoadingHeadline = document.querySelector(".loading-page__headline");
// const accounts = [userMark, userTomas];
const popupHeadline = document.querySelector(".wrong-password__headline");
const registerButton = document.querySelector(".btn__registration");
const registerInput = document.querySelectorAll(".register__input");
const registerFullName = document.querySelector(".register__fullName");
const registerUserName = document.querySelector(".register__userName");
const registerPassword = document.querySelector(".register__password");
const registerBirthDate = document.querySelector(".register__dateBirth");

let createdAccount;
let currentAccount;

const currentDate = new Date();
const currentDateIso = currentDate.toISOString();

export const registerMechanics = function () {
  // register button handler
  registerButton.addEventListener("click", function (e) {
    e.preventDefault();

    // if all inputs are filled then create account if not open popup with error
    if (
      registerFullName.value === "" ||
      registerPassword.value === "" ||
      registerFullName.value === "" ||
      registerBirthDate.value === ""
    ) {
      switchPages.openPopup();
      popupHeadline.textContent = "Fill all inputs ";

      // if user name is already taken
    } else if (
      acc.accounts.find((acc) => acc.userName === registerUserName.value)
    ) {
      switchPages.openPopup();
      popupHeadline.textContent = "This user name has already been declared";
    } else {
      createdAccount = new acc.User(
        registerFullName.value,
        registerUserName.value,
        registerPassword.value,
        registerBirthDate.value,
        `${currentDateIso}`,
        []
      );

      createdAccount.calcAge();
      createdAccount.calcBalance();
      createdAccount.calcNumbers();
      createdAccount.calcValid();

      //registered succesfully
      acc.accounts.push(createdAccount);
      currentAccount = createdAccount;
      let starterDepositTransaction;

      starterDepositTransaction = {
        type: "deposit",
        amount: 2000,
        date: new Date().toISOString(),
        category: "Starter Pack",
        company: "Cryptobank",
      };

      currentAccount.transactions.push(starterDepositTransaction);

      console.log(currentAccount);
      update.initSettings(currentAccount);
      switchPages.switchToMainPage();

      // text on loading headline
      pageLoadingHeadline.textContent = "Creating account...";
    }

    // clear input fields
    registerInput.forEach((input) => (input.value = ""));
  });
};
