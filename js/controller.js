//////////////////////////
// exchange rate api
// const data = null;

// const xhr = new XMLHttpRequest();
// xhr.withCredentials = true;

// xhr.addEventListener("readystatechange", function () {
// 	if (this.readyState === this.DONE) {
// 		console.log(this.responseText);
// 	}
// });

// xhr.open("GET", "https://exchangerate-api.p.rapidapi.com/rapid/latest/USD");
// xhr.setRequestHeader("X-RapidAPI-Key", "e69884d78amsh448bfc5b6c91337p16c2cejsnfe6f5e3278c6");
// xhr.setRequestHeader("X-RapidAPI-Host", "exchangerate-api.p.rapidapi.com");

// xhr.send(data);

// fear greed request api
const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
  }
});

xhr.open("GET", "https://fear-and-greed-index.p.rapidapi.com/v1/fgi");
xhr.setRequestHeader(
  "X-RapidAPI-Key",
  "e69884d78amsh448bfc5b6c91337p16c2cejsnfe6f5e3278c6"
);
xhr.setRequestHeader("X-RapidAPI-Host", "fear-and-greed-index.p.rapidapi.com");

xhr.send(data);

//////////////////////////////////////////////////////////

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

// querty selectors
const btnContainer = document.querySelector(".sign-in__btn-container");
const btns = document.querySelectorAll(".sign-in__headline");
const btnLogin = document.querySelector(".btn__login");
const signInParagraph = document.querySelector(".sign-in__paragraph");
const pageLoadingHeadline = document.querySelector(".loading-page__headline");
const loginContainer = document.querySelector(".loginContainer");
const registrationContainer = document.querySelector(".registrationContainer");
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
const registerButton = document.querySelector(".btn__registration");
const registerInput = document.querySelectorAll(".register__input");
const registerFullName = document.querySelector(".register__fullName");
const registerUserName = document.querySelector(".register__userName");
const registerPassword = document.querySelector(".register__password");
const registerBirthDate = document.querySelector(".register__dateBirth");
const mainPage = document.querySelector(".section-mainPage");
const starterPage = document.querySelector(".section-starter");
let createdAccount;

let currentPopupState;

// init function
const init = function () {
  btnLogin.textContent = "Login";
  btns.forEach((btn) => {
    btn.classList.remove("active");
  });
  signInParagraph.classList.add("pulse-text");
  signInParagraph.textContent = "HINT";
};

// open popup function
const openPopup = function () {
  wrongCredentialsPopup.classList.add("open");
  overlay.classList.remove("hidden");
};

// switch to main page
const switchToMainPage = function () {
  starterPage.classList.add("hide");
  mainPage.classList.remove("hide");
  overlay.classList.add("hide");

  // loading animation mechanics
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

  gsap.fromTo(".main", { opacity: 0 }, { opacity: 0.8, duration: 1, delay: 6 });
};

// closing popup on click

closePopupButton.addEventListener("click", function (e) {
  e.preventDefault();

  overlay.classList.add("hidden");
  wrongCredentialsPopup.classList.remove("open");
});

// closing popup on background

overlay.addEventListener("click", function (e) {
  wrongCredentialsPopup.classList.remove("open");
  overlay.classList.add("hidden");
});

// closing popup on keystroke

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    wrongCredentialsPopup.classList.remove("open");
    overlay.classList.add("hidden");
  }
});

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
  } else {
    loginContainer.classList.remove("hide");
    registrationContainer.classList.add("hide");
  }
});

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
    console.log("login succesfull");
    switchToMainPage();
  } else {
    openPopup();
    popupHeadline.textContent = "Wrong Password";
  }

  pageLoadingHeadline.textContent = "Loggin in...";
  userNameInput.value = passwordInput.value = "";
});

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
    // text on loading headline
    pageLoadingHeadline.textContent = "Creating account...";
  }

  // clear input fields
  registerInput.forEach((input) => (input.value = ""));
});
