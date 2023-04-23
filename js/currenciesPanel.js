export const state = {
  currencies: [],
  oldCurrencies: [],
  difference: [],
  forDisplay: {},
};

// yesterday date
const yesterday = new Date();

yesterday.setDate(yesterday.getDate() - 1);

const formatDate = function (date) {
  const day = new Date(date).getDay();
  const month = new Date(date).getMonth() + 1;
  const year = new Date(date).getFullYear();
  const fullDate = year + "/" + month + "/" + day;
  return fullDate;
};

formatDate(yesterday);

// loading latest prices
export const loadCurrencies = async function () {
  const res = await fetch(
    " https://v6.exchangerate-api.com/v6/619f54c3a77115dd5d7d53d8/latest/USD"
  );

  const data = await res.json();

  if (!res.ok) throw new Error(`${data.message}`);

  const allData = data.conversion_rates;

  for (const [key, value] of Object.entries(allData)) {
    state.currencies.push({ id: key, value: value });
  }
};

// loading day before latest

export const loadOldCurrencies = async function () {
  const res = await fetch(
    `https://v6.exchangerate-api.com/v6/619f54c3a77115dd5d7d53d8/history/USD/${formatDate(
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

const array1 = [1, 2, 43, 5];

const arrayofObj = [
  {
    key: 1,
    value: 3,
  },
  {
    key: 2,
    value: 10,
  },
  {
    key: 3,
    value: 20,
  },
  {
    id: 123,
    value: 30,
  },
];
