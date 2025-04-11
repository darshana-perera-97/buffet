import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';

function HotelView() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch hotel details from API
    // For now, using dummy data
    const dummyHotel = {
      id: parseInt(id),
      name: 'Luxury Palace Hotel',
      location: 'Downtown',
      rating: 4.5,
      image: 'https://via.placeholder.com/1200x400',
      description: 'Experience luxury dining at its finest with our world-class buffet.',
      amenities: ['Free WiFi', 'Parking', 'Wheelchair Accessible', 'Air Conditioning'],
      buffets: [
        {
          id: 1,
          name: 'Sunday Brunch Buffet',
          price: 49.99,
          time: '10:00 AM - 2:00 PM',
          description: 'Indulge in our extensive Sunday brunch spread featuring international cuisine.',
          image: 'https://via.placeholder.com/300x200'
        },
        {
          id: 2,
          name: 'Evening Dinner Buffet',
          price: 59.99,
          time: '6:00 PM - 10:00 PM',
          description: 'Experience a culinary journey with our evening dinner buffet.',
          image: 'https://via.placeholder.com/300x200'
        }
      ]
    };

    setHotel(dummyHotel);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <Container className="py-5 text-center">
        <h2>Hotel not found</h2>
        <Button as={Link} to="/hotels" variant="primary" className="mt-3">
          Back to Hotels
        </Button>
      </Container>
    );
  }

  return (
    <div>
      {/* Hotel Header */}
      <div className="hotel-header position-relative">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-100"
          style={{ height: '400px', objectFit: 'cover' }}
        />
        <div className="position-absolute bottom-0 start-0 w-100 p-4 text-white"
             style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}>
          <Container>
            <h1 className="display-4 fw-bold">{hotel.name}</h1>
            <p className="lead mb-0">
              <i className="fas fa-map-marker-alt me-2"></i>
              {hotel.location}
            </p>
          </Container>
        </div>
      </div>

      <Container className="py-5">
        {/* Hotel Info */}
        <Row className="mb-5">
          <Col md={8}>
            <h2 className="mb-4">About {hotel.name}</h2>
            <p className="lead">{hotel.description}</p>
            <div className="mb-4">
              <h5 className="mb-3">Amenities</h5>
              <div className="d-flex flex-wrap gap-2">
                {hotel.amenities.map((amenity, index) => (
                  <Badge key={index} bg="light" text="dark" className="p-2">
                    <i className="fas fa-check me-2"></i>
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>
          </Col>
          <Col md={4}>
            <Card className="text-center p-4">
              <div className="display-4 text-primary mb-3">{hotel.rating}</div>
              <div className="text-warning mb-3">
                {'★'.repeat(Math.floor(hotel.rating))}
                {'☆'.repeat(5 - Math.floor(hotel.rating))}
              </div>
              <p className="text-muted mb-0">Based on customer reviews</p>
            </Card>
          </Col>
        </Row>

        {/* Buffets Section */}
        <h2 className="section-title text-center mb-5">Available Buffets</h2>
        <Row className="g-4">
          {hotel.buffets.map(buffet => (
            <Col key={buffet.id} md={6}>
              <Card className="h-100">
                <Card.Img variant="top" src={buffet.image} alt={buffet.name} />
                <Card.Body>
                  <Card.Title>{buffet.name}</Card.Title>
                  <Card.Text>{buffet.description}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <i className="fas fa-clock me-2 text-primary"></i>
                      {buffet.time}
                    </div>
                    <div className="h5 mb-0">${buffet.price}</div>
                  </div>
                  <Button
                    as={Link}
                    to={`/reservation/${hotel.id}/${buffet.id}`}
                    variant="primary"
                    className="w-100"
                  >
                    Make Reservation
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default HotelView; 