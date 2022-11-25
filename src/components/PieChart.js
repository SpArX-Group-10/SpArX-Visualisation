import { Pie } from "react-chartjs-2";
import { Chart, ChartOptions} from "chart.js";
import React from "react";


export const PieChartComponent = (supportingWeights, attackingWeights) => {
  // var labels = Object.keys(supportingWeights);
  // var data = Object.values(supportingWeights);

  // var colors = Array(labels.length).fill("#00FF00");

  // var datasets = [
  //   {
  //     data: data,
  //     backgroundColor: colors,
  //   }
  // ]

  // TODO: Fix labels and datasets for pie chart

  var labels = ["2011", "2012", "2014", "2016", "2018"]

  var datasets = [
    {
      data: [2000, 4000, 2300, 2222, 3333],
      backgroundColor: ["#000000", "#58508d", "#bc5090", "#ff6361", "#ffa600"]
    }
  ]

  return (
    <div>
        <Pie
          options={{
            width: "400",
            height: "400",
            legend: {
              labels: {
                fontColor: "white",
              }
            },
          }}

          data={{
            labels: labels,
            datasets: datasets
          }}
        />
    </div>
  );
}