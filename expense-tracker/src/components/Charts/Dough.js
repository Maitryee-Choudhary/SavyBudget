import React from "react";
import 'chart.js/auto';
import { Doughnut } from "react-chartjs-2";

const  DoughChart = ({ chartData ,title}) => {
  return (
    <div className="chart-container" responsive="md">
      {/* <h2 style={{ textAlign: "center" }}>Pie Chart</h2> */}
      <Doughnut
        data={chartData}
        height="400px"
        width="400px"
        options={{
          plugins: {
            title: {
              display: true,
              text: title,
              font: {
                size: 24,
                style: 'italic',
                family: 'Helvetica Neue'
              }
            },
            
          },
          cutout:32,
          spacing:6,
          maintainAspectRatio : false
        }}
      />
    </div>
  );
}
export default DoughChart;