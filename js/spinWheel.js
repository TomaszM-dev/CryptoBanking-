/////////////////////////////
/////////////////////////////
/////////////////////////////
/////////////////////////////
/////////////////////////////

/////////////////////////////
/////////////////////////////

// query selectors
const spinButton = document.querySelector(".spin-win__button");
const spinFinalValue = document.querySelector(".spin-win__finalValue");
const spinWheel = document.getElementById("spin-win__wheel");
const gameCurBalance = document.querySelector(".spin-win__score");
const accountBalance = document.querySelector(".spin-win__balance");
const depositButton = document.querySelector(".spin-win__deposit");

const rotationValues = [
  {
    minDegree: 0,
    maxDegree: 30,
    value: 2,
    award: 200,
  },
  {
    minDegree: 31,
    maxDegree: 91,
    value: 1,
    award: 2500,
  },
  {
    minDegree: 91,
    maxDegree: 150,
    award: 500,
    value: 6,
  },
  {
    minDegree: 151,
    maxDegree: 210,
    value: 5,
    award: -600,
  },
  {
    minDegree: 211,
    maxDegree: 270,
    value: 4,
    award: -1700,
  },
  {
    minDegree: 271,
    maxDegree: 330,
    value: 3,
    award: -400,
  },
  {
    minDegree: 331,
    maxDegree: 360,
    value: 2,
    award: 3000,
  },
];

const data = [16, 16, 16, 16, 16, 16];

const colors = [
  "#01a001",
  "#047804",
  "#01a001",
  "#047804",
  "#01a001",
  "#047804",
];

const labelCreator = function () {
  let labelArr = [];
  for (let i of rotationValues) {
    labelArr.push(i.award);
  }
  return labelArr;
};

let myChart = new Chart(spinWheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: [2500, 3000, -400, -1700, -600, 500],
    datasets: [
      {
        backgroundColor: colors,
        data: data,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        color: "#fff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 20, weight: 600 },
      },
    },
  },
});

let awardArr = [];
const createRandomAngle = function (angleValue) {
  for (let i of rotationValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      spinFinalValue.innerHTML = `<p>You ${i.award > 0 ? "won" : "lost"} ${
        i.award
      }$</p>`;

      const award = Number(i.award);

      awardArr.push(award);

      const sumAward = awardArr.reduce(function (acc, cur) {
        return acc + cur;
      }, 0);

      console.log(sumAward);
      gameCurBalance.textContent = sumAward;

      break;
    }
  }
};

let count = 0;

let resultValue = 101;

let curAccBalance = 8000;
let curGameBalance = 0;

gameCurBalance.textContent = curGameBalance;
accountBalance.textContent = curAccBalance;

const playGame = function () {
  const playFee = 500;

  accountBalance.textContent = curAccBalance -= playFee;

  spinFinalValue.innerHTML = " Good Luck";

  let randomDegree = Math.floor(Math.random() * 360);

  let rotationInterval = window.setInterval(() => {
    myChart.options.rotation = myChart.options.rotation + resultValue;

    myChart.update();

    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      createRandomAngle(randomDegree);
      clearInterval(rotationInterval);

      count = 0;
      resultValue = 101;
    }
  }, 10);
};

spinButton.addEventListener("click", playGame);

depositButton.addEventListener("click", function () {
  const deposit = awardArr.reduce(function (acc, cur) {
    return acc + cur;
  }, 0);

  console.log(curAccBalance);
  curAccBalance += deposit;
  console.log(curAccBalance);
  curGameBalance = 0;

  gameCurBalance.textContent = curGameBalance;
  accountBalance.textContent = curAccBalance;
});
