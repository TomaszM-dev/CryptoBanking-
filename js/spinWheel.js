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

const rotationValues = [
  {
    minDegree: 0,
    maxDegree: 30,
    value: 2,
    award: 0,
  },
  {
    minDegree: 31,
    maxDegree: 91,
    value: 1,
    award: 1000,
  },
  {
    minDegree: 91,
    maxDegree: 150,
    award: 300,
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
    award: 200,
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
    labels: [1000, 200, -400, -1700, -600, 300],
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

const createRandomAngle = function (angleValue) {
  for (let i of rotationValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      spinFinalValue.innerHTML = `<p>You ${i.award > 0 ? "won" : "lost"} ${
        i.award
      }$</p>`;

      console.log(i);

      break;
    }
  }
};

let count = 0;

let resultValue = 101;

const playGame = function () {
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
