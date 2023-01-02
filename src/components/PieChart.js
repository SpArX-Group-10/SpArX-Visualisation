import { Pie } from "react-chartjs-2";
import React from "react";

export const PieChartComponent = ({ supportingWeights, attackingWeights, hiddenWeight }) => {
  const suppLabels = Object.keys(supportingWeights);
  const attLabels = Object.keys(attackingWeights);
  const allLabels = (hiddenWeight===0) ? suppLabels.concat(attLabels) : suppLabels.concat(attLabels).concat(Array(1).fill("Hidden"));
  const suppColor = "#00CC00";
  const attColor = "#FF0000";
  const hidColor = (hiddenWeight>0) ? "#7AA073" : "#A07373";
  var data = Object.values(supportingWeights).concat(Object.values(attackingWeights));
  var colors = Array(suppLabels.length).fill(suppColor).concat(Array(attLabels.length).fill(attColor));

  if(hiddenWeight!==0){
    data = data.concat(Array(1).fill(hiddenWeight));
    colors = colors.concat(Array(1).fill(hidColor));
  }

  var datasets = [
    {
      data: data,
      backgroundColor: colors,
    },
  ];

  return (
    <div>
      <Pie
        options={{
          width: "400",
          height: "400",
          legend: {
            labels: {
              fontColor: "white",
            },
          },
        }}
        data={{
          labels: allLabels,
          datasets: datasets,
        }}
      />
    </div>
  );
};
