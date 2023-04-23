import { loginMechanics } from "./loginMechanics.js";
import { registerMechanics } from "./registerMechanics.js";
import * as curPanel from "./currenciesPanel.js";

loginMechanics();
registerMechanics();

const currContainer = document.querySelector(".currencies-panel");
currContainer.innerHTML = "";
const changeContainer = document.querySelector(".currencies__item-change");
// changeContainer.innerHTML = "";

const exchangeApi = async function () {
  try {
    // load currencies
    await curPanel.loadOldCurrencies();
    await curPanel.loadCurrencies();
    const latestCurrencies = curPanel.state.currencies;
    const oldCurrencies = curPanel.state.oldCurrencies;
    curPanel.currencyChangeRate(latestCurrencies, oldCurrencies);
    const difference = curPanel.state.difference;

    const es = function (i) {
      latestCurrencies[i].diff = Number(difference[i]);
    };

    es(2);
    console.log(latestCurrencies[2]);

    latestCurrencies.forEach((c) => {
      const markup = `  <div class="currencies__item">
        <div class="currencies__item-price">${c.value}</div>
        <div class="currencies__item-change"></div>
        <div class="currencies__item-pair">USD / ${c.id}</div>
        <div class="currencies__item-flags"></div>
      </div> `;

      currContainer.insertAdjacentHTML("afterbegin", markup);
    });
  } catch (err) {
    alert(err);
  }
};

exchangeApi();
