//////////////////////////

// api function

// const showCurrencies = async function () {
//   try {
//     const res = await fetch();
//     "https://api.currencyapi.com/v3/latest?apikey=RkQA17UD93SpqezRr6p23beZLZyouGpDveRfR0uX"
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     let currency = data.data;
//     for (const [code, value] of Object.entries(currency)) {
//       currency = {
//         name: code,
//         value: value.value,
//       };
//     }
//   } catch (err) {
//     alert(err);
//   }
// };
// showCurrencies()

// querty selectors

const btnContainer = document.querySelector(".sign-in__btn-container");
const btns = document.querySelectorAll(".sign-in__headline");
const btnLogin = document.querySelector(".btn__login");
const signInParagraph = document.querySelector(".sign-in__paragraph");
const pageLoadingHeadline = document.querySelector(".loading-page__headline");

let currentPopupState;
// starter init
currentPopupState = 0;
const loginContainer = document.querySelector(".loginContainer");
const registrationContainer = document.querySelector(".registrationContainer");

// init function

const init = function () {
  btnLogin.textContent = "Login";
  btns.forEach((btn) => {
    btn.classList.remove("active");
  });
  signInParagraph.classList.add("pulse-text");
  signInParagraph.textContent = "HINT";
};
console.log(currentPopupState);

// selecting between registration and login

btnContainer.addEventListener("click", function (e) {
  e.preventDefault();
  init();

  const clicked = e.target.closest(".sign-in__headline");

  if (!clicked) return;

  if (!clicked.classList.contains("active")) {
    clicked.classList.add("active");
  } else {
    clicked.classList.remove("active");
  }

  if (clicked.classList.contains("sign-in__register")) {
    currentPopupState = 1;
    loginContainer.classList.add("hide");
    registrationContainer.classList.remove("hide");
    console.log(currentPopupState);
  } else {
    loginContainer.classList.remove("hide");
    registrationContainer.classList.add("hide");
  }
});

// two accounts

const userTomas = {
  firstName: "Tom",
  lastName: "Smith",
  userName: "tom123",
  password: "123",
  birthDate: "2000 ,11,08",
  movements: [1100, 2000, -300, 140, -1500, 300, 440, -242],
  curBalance: "2000",
};
const userMark = {
  firstName: "Mark",
  lastName: "Smith",
  userName: "mark123",
  password: "123",
  birthDate: "2000 ,11,08",
  movements: [1100, 2000, -300, 140, -1500, 300, 440, -242],
  curBalance: "2000",
};

// query selectors

const accounts = [userMark, userTomas];
const signInButton = document.querySelector(".btn__login");
const userNameInput = document.querySelector(".sign-in__username");
const passwordInput = document.querySelector(".sign-in__password");
let currentAccount;
const wrongCredentialsPopup = document.querySelector(".wrong-password__popup");
const sectionStarter = document.getElementById("sectionStart");
const closePopupButton = document.querySelector(".wrong-password__close");
const overlay = document.querySelector(".overlay");
const popupHeadline = document.querySelector(".wrong-password__headline");

// open popup function
const openPopup = function () {
  wrongCredentialsPopup.classList.add("open");
  overlay.classList.remove("hidden");
};

// login button handler
signInButton.addEventListener("click", function (e) {
  e.preventDefault();

  currentAccount = accounts.find((acc) => acc.userName === userNameInput.value);

  if (currentAccount === undefined) {
    openPopup();
    popupHeadline.textContent = "Wrong Username";
    return;
  }

  if (currentAccount.password === passwordInput.value) {
  } else {
    openPopup();
    popupHeadline.textContent = "Wrong Password";
  }

  console.log("login succesfull");
  switchToMainPage();

  if (!mainPage.classList.contains(".hide")) {
  }

  pageLoadingHeadline.textContent = "Loggin in...";

  userNameInput.value = passwordInput.value = "";
});

const registerButton = document.querySelector(".btn__registration");

registerButton.addEventListener("click", function (e) {
  console.log(e.target);
});

// closing popup

closePopupButton.addEventListener("click", function (e) {
  e.preventDefault();

  overlay.classList.add("hidden");
  wrongCredentialsPopup.classList.remove("open");
});

overlay.addEventListener("click", function (e) {
  wrongCredentialsPopup.classList.remove("open");
  overlay.classList.add("hidden");
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    wrongCredentialsPopup.classList.remove("open");
    overlay.classList.add("hidden");
  }
});

// query selectors registration
const registerInput = document.querySelectorAll(".register__input");
const registerFullName = document.querySelector(".register__fullName");
const registerUserName = document.querySelector(".register__userName");
const registerPassword = document.querySelector(".register__password");
const registerBirthDate = document.querySelector(".register__dateBirth");
const mainPage = document.querySelector(".section-mainPage");
const starterPage = document.querySelector(".section-starter");
let createdAccount;

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
    openPopup();
    popupHeadline.textContent = "Fill all inputs ";

    // if user name is already taken
  } else if (accounts.find((acc) => acc.userName === registerUserName.value)) {
    openPopup();
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
    accounts.push(createdAccount);
    console.log("registered succesfully");

    switchToMainPage();
  }

  // clear input fields
  registerInput.forEach((input) => (input.value = ""));

  pageLoadingHeadline.textContent = "Creating account...";

  console.log(accounts);
});

const switchToMainPage = function () {
  starterPage.classList.add("hide");
  mainPage.classList.remove("hide");
  overlay.classList.add("hide");

  gsap.fromTo(
    ".loading-page",
    { opacity: 1 },
    { opacity: 0, duration: 1.3, delay: 5.5 }
  );

  gsap.fromTo(
    ".loading-page__headline",
    { y: 50, opacity: 0 },
    {
      opacity: 1,
      duration: 2,
      y: 0,
    }
  );
};
