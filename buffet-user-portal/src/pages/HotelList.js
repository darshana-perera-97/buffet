import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HotelList() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // TODO: Fetch hotels from API
    // For now, using dummy data
    const dummyHotels = [
      {
        id: 1,
        name: 'Luxury Palace Hotel',
        location: 'Downtown',
        rating: 4.5,
        image: 'https://via.placeholder.com/300x200',
        description: 'Experience luxury dining at its finest with our world-class buffet.',
      },
      {
        id: 2,
        name: 'Grand Plaza Hotel',
        location: 'Business District',
        rating: 4.3,
        image: 'https://via.placeholder.com/300x200',
        description: 'International cuisine with local flavors in a sophisticated setting.',
      },
      // Add more dummy hotels as needed
    ];

    setHotels(dummyHotels);
    setLoading(false);
  }, []);

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="section-title text-center mb-5">Our Hotels</h1>
      
      {/* Search Section */}
      <Row className="mb-4">
        <Col md={6} className="mx-auto">
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Search hotels by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Hotels Grid */}
      <Row className="g-4">
        {filteredHotels.map(hotel => (
          <Col key={hotel.id} md={6} lg={4}>
            <Card className="hotel-card h-100">
              <Card.Img variant="top" src={hotel.image} alt={hotel.name} />
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <Card.Title>{hotel.name}</Card.Title>
                  <span className="badge bg-primary">{hotel.rating} ★</span>
                </div>
                <Card.Text className="text-muted mb-2">
                  <i className="fas fa-map-marker-alt me-2"></i>
                  {hotel.location}
                </Card.Text>
                <Card.Text>{hotel.description}</Card.Text>
                <Button
                  as={Link}
                  to={`/hotels/${hotel.id}`}
                  variant="outline-primary"
                  className="w-100"
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default HotelList; 