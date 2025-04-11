import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const CustomNavbar = () => {
  const user = JSON.parse(localStorage.getItem("user")); // simulate login
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Buffet Booking</Navbar.Brand>
        <Nav className="ml-auto">
          {user ? (
            <Navbar.Text>Welcome, {user.email}</Navbar.Text>
          ) : (
            <Button variant="outline-primary" href="/">
              Login
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
