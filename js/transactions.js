// query selectors

// transfer
const transferBtn = document.querySelector(".transactions__button-transfer");
const transferToInput = document.querySelector(".transactions__input-to");
const transferToAmount = document.querySelector(".transactions__input-amount");
const transferToCvv = document.querySelector(".transactions__input-cvv");

const transferTo = function (e) {
  e.preventDefault();

  if (
    transferToInput.value ||
    transferToAmount.value ||
    transferToCvv.value === ""
  ) {
    return;
  }

  // clear input fields
  transferToInput.value = transferToCvv.value = transferToAmount.value = "";
};

transferBtn.addEventListener("click", transferTo);
