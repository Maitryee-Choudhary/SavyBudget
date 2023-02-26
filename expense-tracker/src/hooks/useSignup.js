
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuthContext} from '../hooks/useAuthContext';

export const useSignup = () => {
    
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();
    const signup = async(name,email, password) =>{
        setIsLoading(true);
        setError(null);

        const response = await fetch('https://savings.onrender.com/api/user/signup', {
            method: "POST",
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify({name,email,password})
        });
        console.log('JSOnn', response);
        const json = await response.json();
        console.log(json);

        if(!response.ok){
            setIsLoading(false);
            setError(json);
           
        }
        if(response.ok){
           //save user to local storage
           console.log("saving to local");
           localStorage.setItem('user', JSON.stringify(json));

            setIsLoading(false);
            dispatch({type: 'LOGIN', payload: json});
            
        }
    }

    return {signup, error, isLoading}

}