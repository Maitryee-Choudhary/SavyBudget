import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Header from "../components/Header"
import Balance from "../components/Balance";
import IncExp from "./pages/IncExp";
import AddTransaction from "./pages/AddTransaction";
import Chart from '../components/Charts/Chart';
import TransactionList from "../components/TransactionList";
import { useAuthContext } from '../hooks/useAuthContext';

const Home = () => {
    const {transactions, dispatch} = useContext(GlobalContext);
    //console.log(transactions);
   const {user} = useAuthContext();
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
       
         <div className="home" responsive="md">
      <div className="summary">
         <Chart />  
      </div> 
      <div className="main_div">
          <div className="container" >
          {/* <Balance /> */}
          <IncExp responsive="md"/>
          <AddTransaction />
          {/* <TransactionList  /> */}
          </div>
      </div>
      <div className="history" style={{}}>
          {/* <TransactionList /> */}
      </div>
    </div>
    
       
    )
}

export default Home;