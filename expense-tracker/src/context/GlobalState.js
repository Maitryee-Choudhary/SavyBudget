import React, { createContext, useReducer , useEffect, useState} from 'react';
import {AppReducer} from './AppReducer';
import axios from 'axios';


//create context
export const GlobalContext = createContext();

//provider
export const GlobalProvider = ({children}) => {
      


    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    
    // const [transactions, dispatch] = useReducer(AppReducer, [], () => {
    //     const localData = localStorage.getItem('transactions');
    //     return localData ? JSON.parse(localData) : [];
    //  });

      //adding local storage
     //everytime transactions state update will be called
//      useEffect( () => {
//         localStorage.setItem('transactions', JSON.stringify(transactions));

//         //calculating total income
//          let a =0 , b = 0;
//         {transactions && transactions.map(transact => (
//             transact.amount < 0 ? a += parseInt(transact.amount*-1) : b+= parseInt(transact.amount)
//         ))}

//         setExpense(a);
//         setIncome(b);

//    },[transactions]);

    const [state, dispatch] = useReducer(AppReducer, {
        transactions: [],
        error: null
    });

  

    useEffect(() => {

        //calculating total income
         let a =0 , b = 0;
        {state.transactions && state.transactions.map(transact => (
            transact.amount < 0 ? a += parseInt(transact.amount*-1) : b+= parseInt(transact.amount)
        ))}

        setExpense(a);
        setIncome(b);

    },[state.transactions]);



 

     return(
            <GlobalContext.Provider value={{transactions:state.transactions, dispatch, income:income, expense:expense}}>
                {children}
            </GlobalContext.Provider>
     )
}