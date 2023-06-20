import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import {useContext, useEffect} from "react";
import { UserContext } from './UserContext';

export default function Navbars() {
    const {setUserInfo, userInfo} = useContext(UserContext);
    useEffect(() => {
      fetch('http://localhost:4000/profile', {
        credentials: 'include',
      }).then(response => {
        response.json().then(userInfo => {
          setUserInfo(userInfo);
        });
      });
    }, []);

    function logout(){
      fetch('http://localhost:4000/logout' , {
        credentials: 'include',
        method: 'POST',
      });
      setUserInfo(null);
    }

    const username= userInfo?.username;

    return(
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{marginBottom:'1px',paddingBottom:'0px'}}>
      <Container fluid>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Brand href="/" className="mr-auto font-weight-bold">FoodHUB</Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="w-100 justify-content-between">
            <Nav.Link href="/SeachByName" className="ms-2 font-weight-bold">Search By Name</Nav.Link>
            <Nav.Link href="/SearchByImage" className="ms-2 font-weight-bold">Search by Image</Nav.Link>
            <Nav.Link href="/Blogs" className="ms-2 font-weight-bold">View Blogs</Nav.Link>
            <Nav.Link href="/AboutUs" className="me-5 font-weight-bold">About Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Nav className="ml-auto">
          {username && (
            <>
              <Button variant="primary" style={{ background: '#005A9C' }} onClick={logout}>Logout</Button>
            </>
          )}
          {!username && (
            <>
              <Button href='/login' variant="primary" style={{ background: '#005A9C' }}>Login</Button>
              <Button href='/register' variant="primary" style={{ background: '#005A9C' }}>Register</Button>
            </>
          )}
          
        </Nav>
      </Container>
    </Navbar>
    
    )
}