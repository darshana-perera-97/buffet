import React, { useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Navbar.css";

const CustomNavbar = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar
      expanded={expanded}
      expand="lg"
      className="custom-navbar"
      variant="dark"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-text">
          <i className="fas fa-utensils me-2"></i>
          Buffet Booking
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="nav-link">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/hotels" className="nav-link">
              Hotels
            </Nav.Link>
            <Nav.Link as={Link} to="/buffets" className="nav-link">
              Buffets
            </Nav.Link>
            <Button
              variant="outline-light"
              className="ms-2 book-now-btn"
              as={Link}
              to="/book"
            >
              Connect with Us
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
