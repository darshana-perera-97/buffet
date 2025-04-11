import React, { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function NavigationBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <i className="fas fa-utensils me-2 text-purple"></i>
          <span className="fw-bold">Buffet Reservation</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="mx-2">
              <i className="fas fa-home me-1"></i> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/hotels" className="mx-2">
              <i className="fas fa-hotel me-1"></i> Hotels
            </Nav.Link>
            <Nav.Link as={Link} to="/buffets" className="mx-2">
              <i className="fas fa-concierge-bell me-1"></i> Buffets
            </Nav.Link>
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/profile" className="mx-2">
                  <i className="fas fa-user me-1"></i> Profile
                </Nav.Link>
                <Button variant="outline-light" className="ms-2">
                  <i className="fas fa-sign-out-alt me-1"></i> Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="mx-2">
                  <i className="fas fa-sign-in-alt me-1"></i> Login
                </Nav.Link>
                <Button as={Link} to="/register" variant="outline-light" className="ms-2">
                  <i className="fas fa-user-plus me-1"></i> Register
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar; 