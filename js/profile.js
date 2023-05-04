// query selectors

const fullNameProfile = document.querySelector(".profile__fullName");
const passwordProfile = document.querySelector(".profile__password");
const birthDateProfile = document.querySelector(".profile__birthDate");
const createdProfile = document.querySelector(".profile__accCreated");
const cardNumberProfile = document.querySelector(".profile__cardNumber");
const cardValidProfile = document.querySelector(".profile__valid");
const ccvProfile = document.querySelector(".profile__ccv");

export const profileSettings = function (currentAccount) {
  fullNameProfile.textContent = currentAccount.fullName;
  passwordProfile.textContent = currentAccount.password;
  birthDateProfile.textContent = currentAccount.birthDate;
  createdProfile.textContent = currentAccount.accountCreated;
  cardNumberProfile.textContent = currentAccount.cardNumber;
  cardValidProfile.textContent = currentAccount.validTill;
  ccvProfile.textContent = currentAccount.ccv;
};
