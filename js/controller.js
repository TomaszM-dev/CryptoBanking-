//////////////////////////

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

const btnContainer = document.querySelector(".sign-in__btn-container");
const btns = document.querySelectorAll(".sign-in__headline");
const btnStarter = document.querySelector(".btn__starter");
const signInParagraph = document.querySelector(".sign-in__paragraph");

// starter init
const init = function () {
  btnStarter.textContent = "Login";
  btns.forEach((btn) => {
    btn.classList.remove("active");
  });
  signInParagraph.classList.add("pulse-text");
  signInParagraph.textContent = "HINT";
};

btnContainer.addEventListener("click", function (e) {
  e.preventDefault();
  init();

  const clicked = e.target.closest(".sign-in__headline");

  if (!clicked) return;

  if (!clicked.classList.contains("active")) {
    clicked.classList.add("active");
    btnStarter.textContent = clicked.textContent;
  } else {
    clicked.classList.remove("active");
  }

  if (clicked.classList.contains("sign-in__register")) {
    signInParagraph.classList.remove("pulse-text");
    signInParagraph.textContent = "I accept Cryptobanking terms and policy";
  }
});

// first account

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

const accounts = [userMark, userTomas];
const signInButton = document.querySelector(".btn__login");
const userNameInput = document.querySelector(".sign-in__username");
const passwordInput = document.querySelector(".sign-in__password");
let currentAccount;
const wrongCredentialsPopup = document.querySelector(".wrong-password__popup");

signInButton.addEventListener("click", function (e) {
  e.preventDefault();

  currentAccount = accounts.find((acc) => acc.userName === userNameInput.value);

  if (currentAccount?.password === passwordInput.value) {
  } else {
    wrongCredentialsPopup.classList.remove("hidden");
  }
  userNameInput.value = passwordInput.value = "";

  // accounts.forEach((acc) => {
  //   if (
  //     acc.userName === userNameInput.value &&
  //     acc.password === passwordInput.value
  //   ) {

  //   }
  // });
});
