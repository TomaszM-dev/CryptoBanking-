//exchange rate api
export const exchangeRateApi = function () {
  const data = null;

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);
    }
  });

  xhr.open("GET", "https://exchangerate-api.p.rapidapi.com/rapid/latest/USD");
  xhr.setRequestHeader(
    "X-RapidAPI-Key",
    "e69884d78amsh448bfc5b6c91337p16c2cejsnfe6f5e3278c6"
  );
  xhr.setRequestHeader("X-RapidAPI-Host", "exchangerate-api.p.rapidapi.com");

  xhr.send(data);
};

// fear greed request api
export const fearGreedApi = function () {
  const data = null;

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);
    }
  });

  xhr.open("GET", "https://fear-and-greed-index.p.rapidapi.com/v1/fgi");
  xhr.setRequestHeader(
    "X-RapidAPI-Key",
    "e69884d78amsh448bfc5b6c91337p16c2cejsnfe6f5e3278c6"
  );
  xhr.setRequestHeader(
    "X-RapidAPI-Host",
    "fear-and-greed-index.p.rapidapi.com"
  );

  xhr.send(data);
};
