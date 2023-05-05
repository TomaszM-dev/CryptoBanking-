import * as curPanel from "./currenciesPanel.js";

const currContainer = document.querySelector(".currencies-panel");
currContainer.innerHTML = "";

export const exchangeApi = async function () {
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
      const type = c.diff >= 0 ? "positive" : "negative";

      const markup = `  <div class="currencies__item">
        <div class="currencies__item-price">${c.value.toFixed(4)}</div>
        <div class="currencies__item-change currencies__item-${type}">${
        c.diff
      }</div>
        <div class="currencies__item-pair">USD / ${c.id}</div>
        <div class="currencies__item-flags"></div>
      </div> `;

      currContainer.insertAdjacentHTML("afterbegin", markup);
    });
  } catch (err) {
    alert(err);
  }
};
