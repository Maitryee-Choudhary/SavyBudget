import React, { useEffect } from 'react';
import { useState, useContext } from "react";
import { GlobalContext } from '../../context/GlobalState';
   import LineChart from './LineChart';
  
import PieChart from "./PieChart";
import BarChart from './BarChart';

const WeekChart = () => {
  
    // const getDayName = (dayIndex) =>{
    //     let daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    //     return daysArray[dayIndex];
    // }
    
  const {transactions,dispatch} = useContext(GlobalContext);

  const [week, setWeek] = useState([0,0,0,0,0,0,0]);

  const [chartData, setChartData] = useState({
    labels: ['Sunday', 'Monday','Tuesday','Wednesday','Thursday', 'Friday', 'Saturday'],
   datasets: [
     {
       label:'Total',
       data: [week[0], week[1],week[2],week[3],week[4],week[5],week[6]],
       backgroundColor: [
        "#2196F3"

       ],
      //  borderColor: 'rgb(75, 192, 192)',
       borderWidth: 2
     }
   ]
 });

//  console.log(transactions);

useEffect(()=> {
    let week = [0,0,0,0,0,0,0];
    transactions.map( (transact) => {
        // console.log(transact.createdAt.getDay());
        if(transact.amount < 0)
        {
            const dt = new Date(transact.createdAt);
            week[dt.getDay()]+= (transact.amount*-1);
        }
        
    }) ;

   setWeek(week);

},[transactions]);

  useEffect(()=> {
     setChartData({
        labels: ['Sunday', 'Monday','Tuesday','Wednesday','Thursday', 'Friday', 'Saturday'],
      datasets: [
        {
          label: 'Total Expenses over each week',
          data: [week[0], week[1],week[2],week[3],week[4],week[5],week[6]],
          backgroundColor: [
            
            "#2196F3",
            
        
  
          ],
          // borderColor: 'rgb(75, 192, 192)',
          borderWidth: 2
        }
      ]
     })
  }, [transactions]);


  return (
    <div className="App"  style={{ marginTop:"30px",marginBottom:"55px"}} responsive="md">
       <BarChart chartData={chartData} title={ "Weekly Expenses"} />
    </div>
  );
}

export default WeekChart;
