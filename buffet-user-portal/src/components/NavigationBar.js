import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, Offcanvas } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

function NavigationBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg" className="py-3">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold">
            <i className="fas fa-utensils me-2"></i>
            Buffet Reservation
          </Navbar.Brand>
          <Button
            variant="outline-light"
            className="d-lg-none"
            onClick={handleShow}
          >
            <i className="fas fa-bars"></i>
          </Button>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/" end>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/hotels">
                Hotels
              </Nav.Link>
              <Nav.Link as={NavLink} to="/buffets">
                Buffets
              </Nav.Link>
              <Nav.Link as={NavLink} to="/admin" className="text-warning">
                Admin
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Buffet Reservation</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={NavLink} to="/" end onClick={handleClose}>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/hotels" onClick={handleClose}>
              Hotels
            </Nav.Link>
            <Nav.Link as={NavLink} to="/buffets" onClick={handleClose}>
              Buffets
            </Nav.Link>
            <Nav.Link as={NavLink} to="/admin" className="text-warning" onClick={handleClose}>
              Admin
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default NavigationBar; 