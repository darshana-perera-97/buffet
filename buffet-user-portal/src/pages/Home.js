import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-4">Welcome to Buffet Reservation</h1>
              <p className="lead mb-4">
                Discover and book the finest buffet experiences at luxury hotels. 
                Indulge in culinary excellence with our easy reservation system.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Button as={Link} to="/hotels" variant="primary" size="lg">
                  Explore Hotels
                </Button>
                <Button as={Link} to="/buffets" variant="outline-light" size="lg">
                  View Buffets
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <h2 className="section-title text-center mb-5">Why Choose Us</h2>
          <Row className="g-4">
            <Col md={4}>
              <div className="text-center p-4">
                <i className="fas fa-utensils fa-3x text-primary mb-3"></i>
                <h3 className="h4 mb-3">Premium Buffets</h3>
                <p className="text-muted">
                  Access to exclusive buffet experiences at top-rated hotels and restaurants.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center p-4">
                <i className="fas fa-calendar-check fa-3x text-primary mb-3"></i>
                <h3 className="h4 mb-3">Easy Booking</h3>
                <p className="text-muted">
                  Simple and secure reservation process with instant confirmation.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center p-4">
                <i className="fas fa-star fa-3x text-primary mb-3"></i>
                <h3 className="h4 mb-3">Best Deals</h3>
                <p className="text-muted">
                  Competitive prices and special offers for our valued customers.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Hotels Section */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="section-title text-center mb-5">Featured Hotels</h2>
          <Row className="g-4">
            {/* Add featured hotel cards here */}
          </Row>
          <div className="text-center mt-4">
            <Button as={Link} to="/hotels" variant="outline-primary">
              View All Hotels
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default Home; 