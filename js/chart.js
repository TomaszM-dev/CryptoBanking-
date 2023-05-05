// import * as currentUser from "./displayCurrentAcc.js";
// import * as acc from "./accounts.js";

// export const chartDisplay = function (currentAccount) {
//   let dataArr = [];
//   let labelsArr = [];

//   currentAccount.transactions.forEach((t) => {
//     const dateReady = currentUser.dateCreator(t.date);
//     labelsArr.push(dateReady);
//     dataArr.push(t.amount);
//   });

//   // setup chart block
//   const data = {
//     labels: labelsArr,
//     datasets: [
//       {
//         data: dataArr,
//         label: "# of Amount",
//         borderWidth: 1,
//         borderColor: "#01a001",
//         backgroundColor: "#01a001",
//       },
//     ],
//   };

//   // config block
//   const config = {
//     type: "line",
//     data,
//     options: {
//       scales: {
//         y: {
//           beginAtZero: false,
//         },
//       },
//     },
//   };

//   // init block
//   let chart = new Chart(document.getElementById("chart"), config);
// };

// // destroy chart
// export let destroyChart = function () {
//   chart.destroy();
//   chart.data.datasets[0].data = [];
// };

// // render chart again
// export let renderChart = function (currentAccount) {
//   chart = new Chart(document.getElementById("chart"), config);

//   currentAccount.transactions.forEach((t) => {
//     const dateReady = currentUser.dateCreator(t.date);
//     labelsArr.push(dateReady);
//     dataArr.push(t.amount);
//   });

//   chart.data.labels.push(...labelsArr);
//   chart.data.datasets[0].data.push(...dataArr);

//   chart.update();
// };

// // chart.data.labels.push(dateReady);
// // chart.data.datasets[0].data.push(t.amount);
// // chart.update();

// // export const chartDisplay = function (currentAccount) {
// //   const ctx = document.getElementById("chart");

// //   const chart = new Chart(ctx, {
// //     type: "line",

// //     // data
// //     data: {
// //       labels: "",
// //       datasets: [
// //         {
// //           label: "# of Votes",
// //           data: "",
// //           borderWidth: 1,
// //           borderColor: "#00b300",
// //           backgroundColor: "#00b300",
// //         },
// //       ],
// //     },

// //     // options
// //     options: {
// //       scales: {
// //         y: {
// //           beginAtZero: true,
// //         },
// //       },
// //     },
// //   });

// //   currentAccount.transactions.forEach((t) => {
// //     const dateReady = currentUser.dateCreator(t.date);

// //     chart.data.labels.push(dateReady);
// //     chart.data.datasets[0].data.push(t.amount);
// //     chart.update();
// //   });
// // };
