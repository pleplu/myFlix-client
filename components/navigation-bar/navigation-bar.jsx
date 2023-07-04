import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MoviesFilter } from "../movies-filter/movies-filter";
import { Form } from "react-bootstrap";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar className="mb-4" sticky="top" bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          myFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
              </>
            )}

            {user && (
              <>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/user">Profile</Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                
              </>
            )}
          </Nav>

            <Form >
              <MoviesFilter />
            </Form>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};