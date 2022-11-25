import { Pie } from "react-chartjs-2";
import React, { useState } from "react";


export const PieChartComponent = (supportingWeights, attackingWeights) => {
    console.log(typeof(supportingWeights));
    console.log(supportingWeights);
    console.log(supportingWeights.keys);
    var labels = supportingWeights.keys;

    var datasets = [
        {
            data: supportingWeights.values,
            backgroundColor: Array(labels.size()).fill('#008000')
        }
    ]

  return (
    <Pie
      options={{
        width: "400",
        height: "400"
      }}
      data={{
        labels: labels,
        datasets: datasets
      }}
    />
  );
}