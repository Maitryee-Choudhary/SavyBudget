import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const Balance = () => {
   const {income,expense} = useContext(GlobalContext);
   return(
    <>
    <h3>Your Balance</h3>
    <h4>${income-expense}</h4>
    </>
   )
}

export default Balance;