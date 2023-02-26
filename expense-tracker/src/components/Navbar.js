import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

const Navbarr = () => {
  const {user} = useAuthContext();
  
  const {logout} = useLogout();
  const handleClick = () => {
    logout();
  }
  
  return (
    <Navbar collapseOnSelect expand="lg"  style={{backgroundColor: "#2196F3", width:"100%", marginBottom : "30px"}}  >
      <Container fluid>
        <Navbar.Brand href="#home" style={{color:"#fff",marginLeft:"50px"}}><span color="#230557">Savy</span>Budget</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" style={{width:"100%"}}>
            <Nav />
          <Nav className="justify-content-end flex-grow-1 pe-3">
            {user  ?
               <>
                 <Nav.Link as={Link} to="/" style={{color:"#fff"}}>Home</Nav.Link>
                 <Nav.Link as={Link} to="/view-expenses" style={{color:"#fff"}}>View Expense</Nav.Link>
                 <Nav.Link as={Link} to="/history" style={{color:"#fff"}}>History</Nav.Link>
                 {/* <p>{user.name}</p> */}
                 <Nav.Link onClick={handleClick} style={{color:"#fff"}}>Logout</Nav.Link>

               </>
               :
               <>
                  <Nav.Link as={Link} to="/login" style={{color:"#fff"}}>Login</Nav.Link>
                  <Nav.Link as={Link} to="/signup" style={{color:"#fff"}}>Sign Up</Nav.Link>
               </>
             }
           
           
          </Nav>
        
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbarr;