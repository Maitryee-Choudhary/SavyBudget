import React from 'react';

import uuid from 'uuid/v1';

export const AppReducer  = (state,action) => {
       switch(action.type){
              case 'GET_TRANSACTION':
                     {
                            return {
                                   transactions: action.payload
                            }
                     }
              case 'ADD_TRANSACTION':
                     {
                            return {
                                   transactions: [action.payload, ...state.transactions]
                            }
                     }
              case 'DELETE_TRANSACTION':
                     {
                            return {
                                   transactions : state.transactions.filter((t)=>{
                                   return t.id !== action.payload
                            })}
                     }
              case 'TRANSACTION_ERROR':
                     {
                            return {
                                   ...state,
                                   error : action.payload
                            }
                     }
       
        default: return { transactions: state.transactions }
       }
}