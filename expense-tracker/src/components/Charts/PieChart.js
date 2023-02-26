import React from "react";
import 'chart.js/auto';
import { Pie } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";

const  PieChart = ({ chartData ,title}) => {
  return (
    <div className="chart-container"> 
      {/* <h2 style={{ textAlign: "center" }}>Pie Chart</h2> */}
      <Pie
     
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
          spacing:0,
          maintainAspectRatio : false,
          responsive:true
        }}
      />
    </div>
  );
}
export default PieChart;