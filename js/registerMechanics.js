import * as switchPages from "./switchPages.js";
import * as acc from "./accounts.js";

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
      // creating new account
      createdAccount = {
        firstName: registerFullName.value,
        lastName: "",
        userName: registerUserName.value,
        password: registerPassword.value,
        birthDate: registerBirthDate.value,
      };

      // pushing account to accounts array
      acc.accounts.push(createdAccount);
      console.log("registered succesfully");
      currentAccount = createdAccount;
      console.log(currentAccount);

      switchPages.switchToMainPage();
      // text on loading headline
      pageLoadingHeadline.textContent = "Creating account...";
    }

    // clear input fields
    registerInput.forEach((input) => (input.value = ""));
  });
};
