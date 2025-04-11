import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer py-5 mt-auto">
      <Container>
        <Row className="mb-4">
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="text-white mb-3">Buffet Reservation</h5>
            <p className="text-light-50">
              The premier platform for managing and booking buffet reservations at luxury hotels and restaurants.
            </p>
            <div className="social-icons mt-3">
              <a href="#" className="me-3 text-light">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="me-3 text-light">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="me-3 text-light">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-light">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </Col>
          <Col md={2} className="mb-4 mb-md-0">
            <h5 className="text-white mb-3">Quick Links</h5>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/" className="text-light-50 mb-2">Home</Nav.Link>
              <Nav.Link as={Link} to="/buffets" className="text-light-50 mb-2">Buffets</Nav.Link>
              <Nav.Link as={Link} to="/reservations" className="text-light-50 mb-2">Reservations</Nav.Link>
              <Nav.Link as={Link} to="/about" className="text-light-50 mb-2">About Us</Nav.Link>
            </Nav>
          </Col>
          <Col md={2} className="mb-4 mb-md-0">
            <h5 className="text-white mb-3">For Hotels</h5>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/register" className="text-light-50 mb-2">Register Hotel</Nav.Link>
              <Nav.Link as={Link} to="/login" className="text-light-50 mb-2">Hotel Login</Nav.Link>
              <Nav.Link as={Link} to="/pricing" className="text-light-50 mb-2">Pricing</Nav.Link>
              <Nav.Link as={Link} to="/support" className="text-light-50 mb-2">Support</Nav.Link>
            </Nav>
          </Col>
          <Col md={4}>
            <h5 className="text-white mb-3">Contact Us</h5>
            <p className="text-light-50 mb-2">
              <i className="fas fa-map-marker-alt me-2"></i> 123 Buffet Street, Food City
            </p>
            <p className="text-light-50 mb-2">
              <i className="fas fa-phone me-2"></i> +1 (555) 123-4567
            </p>
            <p className="text-light-50 mb-2">
              <i className="fas fa-envelope me-2"></i> info@buffetreservation.com
            </p>
          </Col>
        </Row>
        <hr className="border-light-50" />
        <Row className="mt-3">
          <Col md={6} className="text-center text-md-start">
            <p className="text-light-50 mb-0">
              &copy; {currentYear} Buffet Reservation. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <Nav className="justify-content-center justify-content-md-end">
              <Nav.Link as={Link} to="/privacy" className="text-light-50">Privacy Policy</Nav.Link>
              <Nav.Link as={Link} to="/terms" className="text-light-50">Terms of Service</Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer; 