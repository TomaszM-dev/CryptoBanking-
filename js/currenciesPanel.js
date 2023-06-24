export const state = {
  currencies: [],
  oldCurrencies: [],
  difference: [],
  forDisplay: {},
};

// yesterday date
const yesterday = new Date();

yesterday.setDate(yesterday.getDate() - 1);

export const formatDate = function (date) {
  const day = new Date(date).getDate();
  const month = new Date(date).getMonth() + 1;
  const year = new Date(date).getFullYear();
  const fullDate = year + "/" + month + "/" + day;
  return fullDate;
};

formatDate(yesterday);

// loading latest prices
export const loadCurrencies = async function () {
  const res = await fetch(
    " https://v6.exchangerate-api.com/v6/e2d92976bd296389d528aaa2/latest/USD"
  );

  const data = await res.json();

  if (!res.ok) throw new Error(`${data.message}`);

  const allData = data.conversion_rates;

  for (const [key, value] of Object.entries(allData)) {
    state.currencies.push({ id: key, value: value });
  }
};

// loading currency pairs

// loading day before latest

export const loadOldCurrencies = async function () {
  const res = await fetch(
    `https://v6.exchangerate-api.com/v6/e2d92976bd296389d528aaa2/history/USD/${formatDate(
      yesterday
    )}`
  );

  const data = await res.json();

  if (!res.ok) throw new Error(`${data.message}`);

  const allData = data.conversion_rates;

  for (const [key, value] of Object.entries(allData)) {
    state.oldCurrencies.push({ id: key, value: value });
  }
};

export const currencyChangeRate = function (array1, array2) {
  // going out of object
  const arr1 = array1.map((a) => a.value);
  const arr2 = array2.map((a) => a.value);

  // creating difference
  const min = arr1.map(function (num, idx) {
    return num - arr2[idx];
  });

  // pushing diffrences to array
  min.forEach((p) => {
    state.difference.push(p.toFixed(1));
  });
};
