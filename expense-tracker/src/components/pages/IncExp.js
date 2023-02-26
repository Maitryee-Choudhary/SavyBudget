import React, { useContext, useEffect }  from 'react';
import { GlobalContext } from '../../context/GlobalState';


const IncExp = () => {

  const {transactions, income, expense} = useContext(GlobalContext);
  
    
  //  console.log("Income", income);
  //  console.log("Expe", expense);
   return(
    <div className="inc-exp-container" responsive="md">
       <div>
      <h5>Total Balance</h5>
      {income-expense >= 0 ?
       <b><h3 style={{color:"black"}} id="money-plus" className="money plus">${income-expense}</h3></b>
       :
       <b><h3 style={{color:"black"}} id="money-plus" className="money plus">-${(income-expense)*-1}</h3></b>
       }
     </div>
    <div className='sec2'>
    <div>
      <h5>Income</h5>
      <b><h3 id="money-plus" className="money plus">+${income}</h3></b>
    </div>
    <div>
      <h5>Expense</h5>
      <b><h3 id="money-minus" className="money minus">-${expense}</h3></b>
    </div>
    </div>
  </div>
   )
}

export default IncExp;