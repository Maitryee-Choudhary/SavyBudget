import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { useAuthContext } from '../hooks/useAuthContext';

const TransactionDetails = ({transact}) => {

    const {dispatch} = useContext(GlobalContext);
     const {user} = useAuthContext;
    
    const handleClick = async() => {
      if(!user)
      {
        return
      }
        const response = await fetch('https://savings.onrender.com/api/transaction/' + transact._id, {
            method: "DELETE",
             'Authorization':`Bearer ${user.token}`
          });
      
          const json = await response.json();
          console.log(json);
          if(json.success)
          {
            dispatch({type:'DELETE_TRANSACTION',payload: transact._id})
          }
          if(!json.success)
          {
            dispatch({type:'TRANSACTION_ERROR', payload: json.error});
          }
      
    }

    return(
        transact.amount < 0 ?
        <li className="minus" responsive="md">
            {transact.text} <span style={{backgroundColor:"#FCF3CF ",marginLeft:"10px"}}>-${transact.amount*-1}</span><button className="delete-btn" onClick={handleClick}>x</button>
        </li>
        :
        <li className="plus" responsive="md">
        {transact.text} <span style={{backgroundColor:"#FCF3CF ",marginLeft:"10px"}}>${transact.amount}</span><button className="delete-btn" onClick={handleClick}>x</button>
        </li>
    )
}

export default TransactionDetails;