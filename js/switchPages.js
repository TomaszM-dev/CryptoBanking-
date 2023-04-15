// query selectors
const btnContainer = document.querySelector(".sign-in__btn-container");
const btns = document.querySelectorAll(".sign-in__headline");
const btnLogin = document.querySelector(".btn__login");
const signInParagraph = document.querySelector(".sign-in__paragraph");
const loginContainer = document.querySelector(".loginContainer");
const registrationContainer = document.querySelector(".registrationContainer");
const wrongCredentialsPopup = document.querySelector(".wrong-password__popup");
const closePopupButton = document.querySelector(".wrong-password__close");
const overlay = document.querySelector(".overlay");
const mainPage = document.querySelector(".section-mainPage");
const starterPage = document.querySelector(".section-starter");

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
export const openPopup = function () {
  wrongCredentialsPopup.classList.add("open");
  overlay.classList.remove("hidden");
};

// switch to main page
export const switchToMainPage = function () {
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
    loginContainer.classList.add("hide");
    registrationContainer.classList.remove("hide");
  } else {
    loginContainer.classList.remove("hide");
    registrationContainer.classList.add("hide");
  }
});
