import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.css';


export default function Navbars() {
    return(
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/home">FoodHUB</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/SeachByName">Search By Name</Nav.Link>
            <Nav.Link href="/SearchByImage">Search by Image</Nav.Link>
            <Nav.Link href="/Blogs">View Blogs</Nav.Link>
            <Nav.Link href="/AboutUs">About Us</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <Button variant="primary" style={{ background:'#005A9C' }}>Login</Button>
        </Nav>
        </Container>
      </Navbar>
    )
}