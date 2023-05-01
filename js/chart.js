import * as current from "./displayCurrentAcc.js";

export const chartDisplay = function (currentAccount) {
  const ctx = document.getElementById("chart");

  const chart = new Chart(ctx, {
    type: "line",

    // data
    data: {
      labels: "",
      datasets: [
        {
          label: "# of Votes",
          data: "",
          borderWidth: 1,
          borderColor: "#00b300",
          backgroundColor: "#00b300",
        },
      ],
    },

    // options
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  currentAccount.transactions.forEach((t) => {
    const dateReady = current.dateCreator(t.date);

    chart.data.labels.push(dateReady);
    chart.data.datasets[0].data.push(t.amount);
    chart.update();
  });
  console.log(chart.data.datasets[0].data);
  console.log(chart.data.labels);
};
