import { loginMechanics } from "./loginMechanics.js";
import { registerMechanics } from "./registerMechanics.js";
import * as switchSection from "./switchSections.js";
import * as curPanel from "./currenciesPanel.js";
import * as curConverter from "./currenciesConverter.js";
import * as spinWin from "./spinWheel.js";
import * as transactions from "./transactions.js";
import * as update from "./updateUI.js";

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

    const displayCurrencies = latestCurrencies.map((o, i) => {
      return {
        ...o,
        diff: difference[i],
      };
    });

    displayCurrencies.forEach((c) => {
      const markup = `  <div class="currencies__item">
        <div class="currencies__item-price">${c.value.toFixed(4)}</div>
        <div class="currencies__item-change">${c.diff}</div>
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
