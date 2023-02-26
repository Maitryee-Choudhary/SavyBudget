import React from "react";
import 'chart.js/auto';
import { Bar } from "react-chartjs-2";


const  BarChart = ({ chartData, title }) => {
  return (
    <div className="chart-container" >
      {/* <h2 style={{ textAlign: "center" }}>Pie Chart</h2> */}
      <Bar
  
     
        data={chartData}
        height="400px"
        width="600px"
        options={{
          plugins: {
            title: {
              display: true,
              text:title,
              font: {
                size: 24,
                style: 'italic',
                family: 'Helvetica Neue'
              }
            }
          },
          maintainAspectRatio: false,
          responsive:true
        }
      }
      />
    </div>
  );
}
export default BarChart;