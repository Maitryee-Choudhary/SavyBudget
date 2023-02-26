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

   const [year, setYear] = useState();

   useEffect(()=>{
        const date = new Date();
        setYear(date.getFullYear());
        console.log(year);
   },[]);

    
  const {transactions,dispatch} = useContext(GlobalContext);

  const [week, setWeek] = useState([0,0,0,0,0,0,0]);

  const [chartData, setChartData] = useState({
    labels: ['', 'Janurary', 'Feburary','March','April','May', 'June', 'July', 'August', 'September','October','November','December'],
      datasets: [
        {
          label: 'Current Year',
          data: [0,week[0], week[1],week[2],week[3],week[4],week[5],week[6],week[7],week[8],week[9],week[10],week[11]],
          backgroundColor: [
             "green"
          ],
          borderColor: "green",
          borderWidth: 2
        },
        {
            label: 'Past Year',
            data: [0,week[12], week[13],week[14],week[15],week[16],week[17],week[18],week[19],week[20],week[21],week[22],week[23]],
            backgroundColor: [
               "red"
            ],
            borderColor: 'red',
            borderWidth: 2
          },
          {
            label: 'Past 2 Year',
            data: [0,week[24], week[25],week[26],week[27],week[28],week[29],week[30],week[31],week[32],week[33],week[34],week[35]],
            backgroundColor: [
               "blue"
            ],
            borderColor: 'blue',
            borderWidth: 2
          }
      ]
 });

//  console.log(transactions);

useEffect(()=> {
    var week = Array.from({length: 36}, (x, i) => 0);
   
    transactions.map( (transact) => {
        // console.log(transact.createdAt.getDay());
        if(transact.amount <= 0)
        {
            const dt = new Date(transact.createdAt);
            const yr = dt.getFullYear();
            if(yr == year)
            {
                week[dt.getMonth()]+= (transact.amount*-1);
            }
            else if(year - yr == 1)
            {
                week[dt.getMonth() + 12]+= (transact.amount*-1);
            }
            else if(year - yr == 2)
            {
                week[dt.getMonth()+24]+= (transact.amount*-1);
            }
           
        }
        
    }) ;

   setWeek(week);

},[transactions]);

  useEffect(()=> {
     setChartData({
        labels: ['','Janurary', 'Feburary','March','April','May', 'June', 'July', 'August', 'September','October','November','December'],
      datasets: [
        {
          label: 'Current Year',
          data: [0,week[0], week[1],week[2],week[3],week[4],week[5],week[6],week[7],week[8],week[9],week[10],week[11]],
          backgroundColor: [
             "green"
          ],
          borderColor: "green",
          borderWidth: 2
        },
        {
            label: 'Past Year',
            data: [0,week[12], week[13],week[14],week[15],week[16],week[17],week[18],week[19],week[20],week[21],week[22],week[23]],
            backgroundColor: [
               "red"
            ],
            borderColor: 'red',
            borderWidth: 2
          },
          {
            label: 'Past 2 Year',
            data: [0,week[24], week[25],week[26],week[27],week[28],week[29],week[30],week[31],week[32],week[33],week[34],week[35]],
            backgroundColor: [
               "blue"
            ],
            borderColor: 'blue',
            borderWidth: 2
          }
      ]
     })
  }, [transactions]);


  return (
    <div className="chart-container"  responsive="md">
       <LineChart chartData={chartData} title={"Comparison of Expenses over 3 year"} />
    </div>
  );
}

export default WeekChart;
