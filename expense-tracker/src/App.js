import Header from "./components/Header";
import Balance from "./components/Balance";
import TransactionList from "./components/TransactionList";
import AddTransaction from "./components/pages/AddTransaction";
import { GlobalProvider } from "./context/GlobalState";
import Chart from './components/Charts/Chart';
import CategoryChart from "./components/Charts/CategoryChart";
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Navbarr from "./components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home";
import SignUp from "./components/Auth/SignUp";
import Login from "./components/Auth/Login";
import { useAuthContext } from "./hooks/useAuthContext";
function App() {

   
   const {user} = useAuthContext();

  return (
    <Router>
    <GlobalProvider>
    

      <Navbarr/>
      <Routes>
        <Route path='/' exact element={!user ? <Login /> : <Home /> } />
        <Route path='/login'  element={!user ? <Login /> : <Home /> } />
        <Route path='/signup'  element={!user ? <SignUp /> : <Home /> } />
        <Route path='/logout'  element = { <Login />} />
        <Route path='/view-expenses' element={ user ? <CategoryChart /> : <Navigate to="/" />  } />
        <Route path='/history' element={ user ? <TransactionList /> : <Navigate to="/" />  } />
      </Routes>
    
    
    </GlobalProvider>
    </Router>
  );
}

export default App;
