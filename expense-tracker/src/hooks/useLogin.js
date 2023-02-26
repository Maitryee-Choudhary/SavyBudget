
import { useState } from 'react';
import {useAuthContext} from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
export const useLogin = () => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();
    
    const login = async(email, password) =>{
        setIsLoading(true);
        setError(null);

        const response = await fetch('https://savings.onrender.com/api/user/login', {
            method: "POST",
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify({email,password})
        });
        console.log('JSOnn', response);
        const json = await response.json();
        console.log(json);

        if(!response.ok){
            setIsLoading(false);
            setError(json);
            
        }
        if(response.ok){
            console.log("saving to local");
           //save user to local storage
           localStorage.setItem('user', JSON.stringify(json));
            
            setIsLoading(false);
            dispatch({type: 'LOGIN', payload: json});
            
            
        }
    }

    return {login, error, isLoading}

}