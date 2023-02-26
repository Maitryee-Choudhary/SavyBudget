import React,{useContext, useEffect} from "react";
import { GlobalContext } from '../../context/GlobalState' ;
import { Line } from "react-chartjs-2";
import { useAuthContext } from "../../hooks/useAuthContext";
function LineChart({ chartData, title}) {

  const {user} = useAuthContext();
  const getWeek = () => {
    let daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = new Date().getDay();
    let dayName = daysArray[day];
    console.log(dayName); 
  }

 const {transactions, dispatch} = useContext(GlobalContext);
 useEffect( () =>{
   const getTransactions = async () => {
      try{
       const response = await fetch('https://savings.onrender.com/api/transaction/',{
        headers:{
           'Authorization':`Bearer ${user.token}`
        }});
       //console.log(response);
       const json = await response.json();
     //  console.log(json, "Json from list");
       dispatch({type: 'GET_TRANSACTION', payload:json.data})
      }catch(e){
         dispatch({type:'TRANSACTION_ERROR', payload:e.response.data.error })
      }
   }
   if(user)
   getTransactions();
}, [transactions,user]);




  return (

    <div className="chart-container" >
      {/* <h2 style={{ textAlign: "center" }}>Line Chart</h2> */}
      <Line
    
        data={chartData}
        height="400px"
        width="600px"
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
            legend: {
              display: true
            }
          },
          maintainAspectRatio: false,
          responsive:true
        }}
      />
    </div>
  );
}
export default LineChart;