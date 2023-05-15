import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';


export default function Navbars() {
    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container fluid>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Brand href="/home" className="mr-auto font-weight-bold">FoodHUB</Navbar.Brand>
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="w-100 justify-content-between">
            <Nav.Link href="/SeachByName" className="ms-2 font-weight-bold">Search By Name</Nav.Link>
            <Nav.Link href="/SearchByImage" className="ms-2 font-weight-bold">Search by Image</Nav.Link>
            <Nav.Link href="/Blogs" className="ms-2 font-weight-bold">View Blogs</Nav.Link>
            <Nav.Link href="/AboutUs" className="me-5 font-weight-bold">About Us</Nav.Link>
        </Nav>
        </Navbar.Collapse>
        <Nav className="ml-auto">
          <Button variant="primary" style={{ background:'#005A9C' }}>Login</Button>
        </Nav>
        </Container>
      </Navbar>
    )
}