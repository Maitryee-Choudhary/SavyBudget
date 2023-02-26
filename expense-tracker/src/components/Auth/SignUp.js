import React, {useState} from 'react';
import { useSignup } from '../../hooks/useSignup';
import {Link} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import LoadingSpinner from '../pages/LoadingSpinner';
const SignUp = () => {
    
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [name, setName] = useState();
    const {signup, error, isLoading} = useSignup();

    const handleSubmit = async (e) => {
         e.preventDefault();
        // console.log(email,password);

         await signup(name,email,password);
        
         setEmail('');
         setPassword('');
         setName('');
    }
    //console.log(error);

    return (
      <>
      {isLoading ? <LoadingSpinner /> : 

      <form onSubmit={handleSubmit}>
        <h3 style={{textAlign:"center", marginTop:"20px"}}>Sign Up</h3>
        <div className='form-control'>
        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            onChange={(e) => setName(e.target.value)}
            value = {name}
          />
        </div>

        {/* <div className="mb-3">
          <label>Last name</label>
          <input type="text" className="form-control" placeholder="Last name" />
        </div> */}

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value = {email}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value = {password}
          />
        </div>

        <div className="d-grid">
        <button disabled={isLoading}>Signup</button>
            {error && <div className='error'>{error}</div>}
        </div>
        <p className="forgot-password text-right">
        <Nav.Link as={Link} to="/login"> Already registered <u><span style={{color:"blue"}}> Login? </span></u></Nav.Link>
        </p>
        </div>
      </form>
      }
      </>
    )
  }

  export default SignUp;