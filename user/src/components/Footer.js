import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="py-5">
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="footer-heading">Buffet Booking</h5>
            <p className="footer-text">
              Discover and book the best buffet experiences at top hotels. 
              Your perfect dining experience awaits.
            </p>
          </Col>
          <Col md={2} className="mb-4 mb-md-0">
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/hotels">Hotels</Link></li>
              <li><Link to="/buffets">Buffets</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </Col>
          <Col md={3} className="mb-4 mb-md-0">
            <h5 className="footer-heading">Contact Us</h5>
            <ul className="footer-links">
              <li><i className="fas fa-phone me-2"></i> +1 234 567 890</li>
              <li><i className="fas fa-envelope me-2"></i> info@buffetbooking.com</li>
              <li><i className="fas fa-map-marker-alt me-2"></i> 123 Food Street, Cuisine City</li>
            </ul>
          </Col>
          <Col md={3}>
            <h5 className="footer-heading">Follow Us</h5>
            <div className="social-links">
              <a href="#" className="social-link"><i className="fab fa-facebook"></i></a>
              <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-link"><i className="fab fa-linkedin"></i></a>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3 border-top">
            <p className="mb-0">&copy; 2024 Buffet Booking. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer; 