import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import {useAuthContext} from '../hooks/useAuthContext';

export const useLogout  = () => {
    
     const {dispatch} = useAuthContext();

     const {dispatch:transactionDispatch} = useContext(GlobalContext);

    const logout = () => {
        //remove user from localstorage
        localStorage.removeItem('user');
        
        
        dispatch({type:'LOGOUT'});
        transactionDispatch({type: 'GET_TRANSACTION', payload:null});
        
        
    }

    return {logout};
}