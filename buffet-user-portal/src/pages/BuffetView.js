import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';

function BuffetView() {
  const { id } = useParams();
  const [buffet, setBuffet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch buffet details from API
    // For now, using dummy data
    const dummyBuffet = {
      id: parseInt(id),
      hotelId: 1,
      hotelName: 'Luxury Palace Hotel',
      name: 'Sunday Brunch Buffet',
      price: 49.99,
      time: '10:00 AM - 2:00 PM',
      description: 'Indulge in our extensive Sunday brunch spread featuring international cuisine.',
      image: 'https://via.placeholder.com/1200x400',
      features: [
        'Live Cooking Stations',
        'International Cuisine',
        'Fresh Seafood',
        'Dessert Corner',
        'Children\'s Menu',
        'Vegetarian Options'
      ],
      menu: [
        {
          category: 'Starters',
          items: ['Fresh Salad Bar', 'Soup Station', 'Bread Selection']
        },
        {
          category: 'Main Course',
          items: ['Grilled Seafood', 'Carving Station', 'Asian Wok Station']
        },
        {
          category: 'Desserts',
          items: ['Ice Cream Bar', 'Pastry Selection', 'Fresh Fruits']
        }
      ]
    };

    setBuffet(dummyBuffet);
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

  if (!buffet) {
    return (
      <Container className="py-5 text-center">
        <h2>Buffet not found</h2>
        <Button as={Link} to="/buffets" variant="primary" className="mt-3">
          Back to Buffets
        </Button>
      </Container>
    );
  }

  return (
    <div>
      {/* Buffet Header */}
      <div className="buffet-header position-relative">
        <img
          src={buffet.image}
          alt={buffet.name}
          className="w-100"
          style={{ height: '400px', objectFit: 'cover' }}
        />
        <div className="position-absolute bottom-0 start-0 w-100 p-4 text-white"
             style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}>
          <Container>
            <h1 className="display-4 fw-bold">{buffet.name}</h1>
            <p className="lead mb-0">
              <i className="fas fa-hotel me-2"></i>
              {buffet.hotelName}
            </p>
          </Container>
        </div>
      </div>

      <Container className="py-5">
        {/* Buffet Info */}
        <Row className="mb-5">
          <Col md={8}>
            <h2 className="mb-4">About the Buffet</h2>
            <p className="lead">{buffet.description}</p>
            <div className="mb-4">
              <h5 className="mb-3">Features</h5>
              <div className="d-flex flex-wrap gap-2">
                {buffet.features.map((feature, index) => (
                  <Badge key={index} bg="light" text="dark" className="p-2">
                    <i className="fas fa-check me-2"></i>
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </Col>
          <Col md={4}>
            <Card className="text-center p-4">
              <div className="h2 text-primary mb-3">${buffet.price}</div>
              <div className="mb-3">
                <i className="fas fa-clock me-2"></i>
                {buffet.time}
              </div>
              <Button
                as={Link}
                to={`/reservation/${buffet.hotelId}/${buffet.id}`}
                variant="primary"
                size="lg"
                className="w-100"
              >
                Make Reservation
              </Button>
            </Card>
          </Col>
        </Row>

        {/* Menu Section */}
        <h2 className="section-title text-center mb-5">Menu Highlights</h2>
        <Row className="g-4">
          {buffet.menu.map((category, index) => (
            <Col key={index} md={4}>
              <Card className="h-100">
                <Card.Header className="bg-primary text-white">
                  <h5 className="mb-0">{category.category}</h5>
                </Card.Header>
                <Card.Body>
                  <ul className="list-unstyled mb-0">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="mb-2">
                        <i className="fas fa-utensils me-2 text-primary"></i>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default BuffetView; 