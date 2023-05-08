// import * as acc from "./accounts.js";
// import * as currentUser from "./displayCurrentAcc.js";

// let currentAccount;
// currentAccount = acc.accounts.find((acc) => acc.userName === "admin");

// export let dataArr = [];
// export let labelsArr = [];

// export function es(currentAccount) {
//   currentAccount.transactions.forEach((t) => {
//     const dateReady = currentUser.dateCreator(t.date);
//     labelsArr.push(dateReady);
//     dataArr.push(t.amount);
//   });
// }

// // setup chart block
// export const data = {
//   labels: labelsArr,
//   datasets: [
//     {
//       data: dataArr,
//       label: "# of Amount",
//       borderWidth: 1,
//       borderColor: "#01a001",
//       backgroundColor: "#01a001",
//     },
//   ],
// };

// // config block
// export const config = {
//   type: "line",
//   data,
//   options: {
//     scales: {
//       y: {
//         beginAtZero: false,
//       },
//     },
//   },
// };

// // init block
// // export let chart = new Chart(document.getElementById("chart"), config);

// // export let renderChart = function () {
// //   chart = new Chart(document.getElementById("chart"), config);

// //   currentAccount.transactions.forEach((t) => {
// //     const dateReady = currentUser.dateCreator(t.date);
// //     labelsArr.push(dateReady);

// //     dataArr.push(t.amount);
// //     chart.data.datasets[0].data = dataArr;
// //     chart.data.labels = labelsArr;
// //     chart.update();
// //   });
// // };

// // console.log(chart.config.data);

// // setTimeout(() => {
// //   destroyChart(chart);
// // }, 1000);
// // console.log(chart.config.data);

// // setTimeout(() => {
// //   renderChart(currentAccount, chart);
// //   console.log(chart.config.data);
// // }, 2000);

// // chart needs to be displayed when currenct account is set ( when user is logged in )

// // then chart need to update it self when new transaction is added

// // new transaction must be displayed on chart with the amount of transaction and date of it.
