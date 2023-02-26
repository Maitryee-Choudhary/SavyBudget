import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import TransactionList from '../TransactionList';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuthContext } from '../../hooks/useAuthContext';
import LoadingSpinner from './LoadingSpinner';

const AddTransaction = () => {
    
    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('groceries');
    const [createdAt, setStartDate] = useState(new Date());
    const {dispatch} = useContext(GlobalContext);
    const {user} = useAuthContext();
    const [error, setError]= useState();
    const [alert, setAlert] = useState(false);
    const [isLoading, setIsLoading] = useState();

     const handleSubmit = async (e) => {
        console.log(amount);
        console.log(text);
        console.log(category);
        e.preventDefault();
        setIsLoading(true);
        if(!user){
          setError(error);
          return;
        }
        
        const transact = {text,amount,category,createdAt}; 
        
        const response = await fetch('https://savings.onrender.com/api/transaction/', {
          method: "POST",
          body: JSON.stringify(transact),
          headers:{
            'Content-Type' :  'application/json',
            'Authorization':`Bearer ${user.token}`
          }
        });
        
        //console.log(response);
        const json = await response.json();
        //console.log(json);

        if(json.success)
        {
          setIsLoading(false);
          setError("Added successfully");
          setTimeout(()=>{
            setError("");
          },5000);
          dispatch({type:'ADD_TRANSACTION', payload: json.data});
        }
        if(!json.success)
        {
          setIsLoading(false);
          setError("Encountered an Error, Please Try Again");
          setTimeout(()=>{
            setError("");
          },5000);
          dispatch({type:'TRANSACTION_ERROR', payload: json.error});
        }

       
        setAmount(0);
        setText('');
     }

   return(
    <>
      {isLoading ? <LoadingSpinner /> :<>
       <h4 style={{textAlign:"center"}}>Add new transaction</h4>
      <form onSubmit={handleSubmit} responsive="md">
        <div className='section'>
        <div className='section1'>
        <div className="form-control">
          <label for="text">Text</label>
          <input 
          type="text" 
          name = "text"
          onChange={(e) => setText(e.target.value)}
          value = {text} 
          placeholder="Enter text..." 
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">Amount <br />(negative- expense, positive - income) </label>
          <input 
          type="number"
          name = "amount"
          onChange={(e) => setAmount(e.target.value)}
          value = {amount}  
          placeholder="Enter amount..." 
          />
          </div>
          </div>
          <div className='section2'>
          <div className='form-control'>
               <label for="text" style={{marginRight:"20px"}}>Category</label>
               <select  onChange={(e) => setCategory(e.target.value)} value={category} >
                <option value="groceries">Groceries</option>
                <option value="transportation">Transportation</option>
                <option value="entertainment">Entertainment</option>
                <option value="dining">Dining Out</option>
                <option value="education">Education</option>
                <option value="shopping">Shopping</option>
                <option value="investment">Investment</option>
                <option value="income">Income</option>
                <option value="unassigned">Unassigned</option>
              </select>
            </div>
            <div className='form-control' style={{display:"flex"}}>
            <label for="text" style={{marginRight:"20px"}} >Date</label>
            <DatePicker selected={createdAt} onChange={(date) => setStartDate(date)} />
          </div>
          </div>
          </div>
        {/* <br /> */}
        <p style={{backgroundColor:"#8DE0FC"}}>{error}</p>
        <button className="btn" style={{backgroundColor: "#81D4FA"}}>Add transaction</button>
      </form>
      </>
}
    </>
   )
}

export default AddTransaction;