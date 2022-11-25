import { Pie } from "react-chartjs-2";
import React, { useState } from "react";


export const PieChartComponent = (supportingWeights, attackingWeights) => {
  var labels = Object.keys(supportingWeights);
  var data = Object.values(supportingWeights);

  var colors = Array(labels.length).fill("#00FF00");

  var datasets = [
    {
      data: data,
      backgroundColor: colors,
    }
  ]

  return (
    <div>
      <Pie
        options={{
          width: "400",
          height: "400",
        }}
        data={{
          labels: labels,
          datasets: datasets
        }}
      />
    </div>
  );
}