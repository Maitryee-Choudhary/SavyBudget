import React, { useEffect } from 'react';
import { useState, useContext } from "react";
import { GlobalContext } from '../../context/GlobalState';
   import LineChart from './LineChart';
import Compare from './Compare';
import PieChart from "./PieChart";
import BarChart from './BarChart';
import WeekChart from './WeekChart';

const CategoryChart = () => {
  
  
  const {transactions,income,expense,dispatch} = useContext(GlobalContext);
 


  
   const [grocer,setGrocer] = useState(0);
   const [shop, setShop] = useState(0);
   const[transport,setTransport] = useState(0);
   const [entertain, setEntertain] = useState(0);
   const [dine,setDine] = useState(0);
   const [edu, setEdu] = useState(0);
   const[invest,setInvest] = useState(0);
   const [unassign, setUnassign] = useState(0);
   const [incom, setIncome] = useState(0);




  const [chartData, setChartData] = useState({
    labels: ['Groceries', 'Shopping','Transport','Entertainment', 'Dining', 'Education', 'Income','Investment', "Unassigned"],
   datasets: [
     {
       label:'Total',
       data: [grocer, shop,transport,entertain,dine,edu,incom,invest,unassign],
       backgroundColor: [
        "#2196F3",
        "#db6e6e",
        "#6edb72",
        "#a06edb",
        "#6ed8db",
        "#90FA00",
        "green",
        "orange",
        "purple"

       ],
       borderColor:  "#2196F3",
       borderWidth: 2
     }
   ]
 });

//  console.log(transactions);

useEffect(()=> {
    let groceri = 0, shopp = 0, t = 0, e = 0, d = 0,edu = 0,i = 0,inc = 0,u=0;
    transactions.map( (transact) => {
        if(transact.category === 'groceries') groceri += (transact.amount);
        else if(transact.category === 'shopping') shopp += transact.amount;
        else if(transact.category === 'transportation') t += transact.amount;
        else if(transact.category === 'education') edu += transact.amount;
        else if(transact.category === 'entertainment') e += transact.amount;
        else if(transact.category === 'dining') d += transact.amount;
        else if(transact.category === 'education') edu += transact.amount;
        else if(transact.category === 'investment') i += transact.amount;
        else if(transact.category === 'income') inc += transact.amount;
        else  u += transact.amount;
    }) ;

    setGrocer(groceri*-1);
    setShop(shopp*-1);
    setDine(d*-1);
    setEdu(edu*-1);
    setEntertain(e*-1);
    setInvest(i);
    setTransport(t*-1);
    setIncome(inc);
    setUnassign(u);

},[transactions]);

  useEffect(()=> {
     setChartData({
      labels: ['Groceries', 'Shopping','Transport','Entertainment', 'Dining', 'Education', 'Income','Investment', "Unassigned"],
      datasets: [
        {
          label: 'Total',
          data: [grocer, shop,transport,entertain,dine,edu,income,invest,unassign],
          backgroundColor: [
            "#2196F3",
             "#db6e6e",
             "#6edb72",
             "#a06edb",
             "#6ed8db",
             "#90FA00",
             "green",
             "orange",
             "purple"
  
          ],
          borderColor:  "#2196F3",
          borderWidth: 2
        }
      ]
     })
  }, [transactions]);


  return (
    <div className="category-wise" responsive="md">
    <div className="charts" responsive="md" style={{ marginTop:"30px",marginBottom:"55px"}}>
       <PieChart chartData={chartData} title={"Categorywise Distribution"}  />
       <LineChart chartData={chartData} title={"Categorwise Distribution"}  /> 
       {/* <BarChart chartData={chartData} /> */}
     </div>
    <WeekChart />
    <Compare  />
    </div>
   
  );
}

export default CategoryChart;
