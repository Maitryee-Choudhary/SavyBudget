import React, { useEffect } from 'react';
import { useState, useContext } from "react";
import { GlobalContext } from '../../context/GlobalState';
import LineChart from './LineChart';
import PieChart from "./PieChart";

const Chart = () => {
  const {transactions,income,expense} = useContext(GlobalContext);
  const [color,setColor] = useState();
  const [chartData, setChartData] = useState({
    labels: ['Income', 'Expense'],
   datasets: [
     {
       label: "Total",
       data: [income, expense],
       backgroundColor: [
          "#3F51B5",
          "#03A9F4"

       ],
       borderColor: "white",
       borderWidth: 2
     }
   ]
 });


  // console.log(transactions, "From chart");

  useEffect(()=> {
     setChartData({
      labels: ['Income', 'Expense'],
      datasets: [
        {
          label: "Total",
          data: [income, expense],
          backgroundColor: [
             "#3F51B5",
             "#03A9F4"
  
          ],
          borderColor: "white",
          borderWidth: 2
        }
      ]
     })
  }, [transactions]);


  return (
    <div className="App"  responsive="md">
       <PieChart chartData={chartData} title={"Income vs Expenses"} />
       {/* <LineChart chartData={chartData} /> */}
    </div>
  );
}

export default Chart;
