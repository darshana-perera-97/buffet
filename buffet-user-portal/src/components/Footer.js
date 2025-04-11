import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row className="mb-4">
          <Col md={4} className="mb-4 mb-md-0">
            <h5>Buffet Reservation</h5>
            <p className="text-light-50">
              Discover the best buffet experiences at luxury hotels. Book your reservation today and enjoy a culinary journey.
            </p>
            <div className="social-icons mt-3">
              <a href="#" className="text-white me-2">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white me-2">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white me-2">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </Col>
          <Col md={2} className="mb-4 mb-md-0">
            <h5>Quick Links</h5>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/" className="px-0">Home</Nav.Link>
              <Nav.Link as={Link} to="/hotels" className="px-0">Hotels</Nav.Link>
              <Nav.Link as={Link} to="/buffets" className="px-0">Buffets</Nav.Link>
              <Nav.Link as={Link} to="/about" className="px-0">About Us</Nav.Link>
              <Nav.Link as={Link} to="/contact" className="px-0">Contact</Nav.Link>
            </Nav>
          </Col>
          <Col md={3} className="mb-4 mb-md-0">
            <h5>Contact Us</h5>
            <p className="text-light-50 mb-1">
              <i className="fas fa-map-marker-alt me-2"></i> 123 Buffet Street, Food City
            </p>
            <p className="text-light-50 mb-1">
              <i className="fas fa-phone me-2"></i> +1 234 567 8900
            </p>
            <p className="text-light-50 mb-1">
              <i className="fas fa-envelope me-2"></i> info@buffetreservation.com
            </p>
          </Col>
          <Col md={3}>
            <h5>Newsletter</h5>
            <p className="text-light-50">
              Subscribe to our newsletter for the latest offers and updates.
            </p>
            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Your email"
                aria-label="Your email"
              />
              <button className="btn btn-primary" type="button">
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </Col>
        </Row>
        <hr className="border-light-50" />
        <Row className="py-3">
          <Col md={6} className="text-center text-md-start">
            <p className="mb-0 text-light-50">
              &copy; {new Date().getFullYear()} Buffet Reservation. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <Nav className="justify-content-center justify-content-md-end">
              <Nav.Link href="#" className="text-light-50 px-2">Privacy Policy</Nav.Link>
              <Nav.Link href="#" className="text-light-50 px-2">Terms of Service</Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer; 