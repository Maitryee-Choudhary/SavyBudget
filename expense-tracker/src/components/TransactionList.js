import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { useAuthContext } from '../hooks/useAuthContext';
import Pagination from './pages/Pagination';
import Records from './pages/Records';
const TransactionList = () => {
    
    const {transactions, dispatch} = useContext(GlobalContext);
    //console.log(transactions);
    const {user} = useAuthContext();

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = transactions.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(transactions.length / recordsPerPage)

    useEffect( () =>{
      const getTransactions = async () => {
         try{
          const response = await fetch('https://savings.onrender.com/api/transaction/', 
          {
            headers:{
               'Authorization':`Bearer ${user.token}`
            }}
          );
          //console.log(response);
          const json = await response.json();
        //  console.log(json, "Json from list");
          dispatch({type: 'GET_TRANSACTION', payload:json.data})
         }catch(e){
            dispatch({type:'TRANSACTION_ERROR', payload:e.response.data.error })
         }
      }
      if(user){
         getTransactions();
      }
      //getTransactions();
  }, [transactions,user]);
  

    return(
       <div className='records' responsive="md">
         <h4 style={{textAlign:"center",marginTop:"5px"}}>Transactions Records</h4>
         <Records transactions={currentRecords} responsive="md" />
         <Pagination
         
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
         />
         <h5>Hover to delete the record</h5>
       </div>
    )
}

export default TransactionList;