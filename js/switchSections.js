// query selectors
const navbarContainer = document.querySelector(".main__list");
const navbarLink = document.querySelectorAll(".main__link");
const overviewItem = document.querySelector(".main__link-overview");
const mainContainer = document.querySelector(".main__center");
const mainSections = document.querySelectorAll(".main-section");
const overviewSection = document.querySelector(".overview");

// const starterInit =  function

const init = function () {
  overviewItem.classList.add("active");
  overviewItem.classList.remove("hide");
};

init();

navbarContainer.addEventListener("click", function (e) {
  e.preventDefault();

  navbarLink.forEach((link) => {
    link.classList.remove("active");
  });
  const clicked = e.target.closest(".main__link");
  if (!clicked) return;

  const linkHash = clicked.getAttribute("href");

  mainSections.forEach((section) => {
    const linkId = section.getAttribute("id");

    if (linkHash === linkId) {
      section.classList.remove("hide");
    } else {
      section.classList.add("hide");
    }
  });

  // if clicked

  clicked.classList.add("active");
});
