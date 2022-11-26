import { Pie } from "react-chartjs-2";
import React from "react";


export const PieChartComponent = ({supportingWeights, attackingWeights}) => {
  const suppLabels = Object.keys(supportingWeights);
  const attLabels = Object.keys(attackingWeights);
  const allLabels = suppLabels.concat(attLabels);
  const suppColor = "#00CC00";
  const attColor = "#FF0000";
  var data = Object.values(supportingWeights).concat(Object.values(attackingWeights));

  var colors = Array(suppLabels.length).fill(suppColor).concat(Array(attLabels.length).fill(attColor));

  var datasets = [
    {
      data: data,
      backgroundColor: colors
    }
  ]

  console.log(datasets);

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
            labels: allLabels,
            datasets: datasets
          }}
        />
    </div>
  );
}