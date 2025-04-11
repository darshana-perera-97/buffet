import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function BuffetList() {
  const [buffets, setBuffets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHotel, setSelectedHotel] = useState('');

  useEffect(() => {
    // TODO: Fetch buffets from API
    // For now, using dummy data
    const dummyBuffets = [
      {
        id: 1,
        hotelId: 1,
        hotelName: 'Luxury Palace Hotel',
        name: 'Sunday Brunch Buffet',
        price: 49.99,
        time: '10:00 AM - 2:00 PM',
        description: 'Indulge in our extensive Sunday brunch spread featuring international cuisine.',
        image: 'https://via.placeholder.com/300x200'
      },
      {
        id: 2,
        hotelId: 1,
        hotelName: 'Luxury Palace Hotel',
        name: 'Evening Dinner Buffet',
        price: 59.99,
        time: '6:00 PM - 10:00 PM',
        description: 'Experience a culinary journey with our evening dinner buffet.',
        image: 'https://via.placeholder.com/300x200'
      },
      {
        id: 3,
        hotelId: 2,
        hotelName: 'Grand Plaza Hotel',
        name: 'Weekend Special Buffet',
        price: 54.99,
        time: '11:00 AM - 3:00 PM',
        description: 'Weekend special featuring local and international delicacies.',
        image: 'https://via.placeholder.com/300x200'
      }
    ];

    setBuffets(dummyBuffets);
    setLoading(false);
  }, []);

  const filteredBuffets = buffets.filter(buffet =>
    (selectedHotel === '' || buffet.hotelId.toString() === selectedHotel) &&
    (buffet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     buffet.hotelName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const uniqueHotels = [...new Set(buffets.map(buffet => buffet.hotelId))];

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
      <h1 className="section-title text-center mb-5">Available Buffets</h1>
      
      {/* Search and Filter Section */}
      <Row className="mb-4">
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Search buffets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Select
              value={selectedHotel}
              onChange={(e) => setSelectedHotel(e.target.value)}
            >
              <option value="">All Hotels</option>
              {uniqueHotels.map(hotelId => {
                const hotel = buffets.find(b => b.hotelId === hotelId);
                return (
                  <option key={hotelId} value={hotelId}>
                    {hotel.hotelName}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {/* Buffets Grid */}
      <Row className="g-4">
        {filteredBuffets.map(buffet => (
          <Col key={buffet.id} md={6} lg={4}>
            <Card className="h-100">
              <Card.Img variant="top" src={buffet.image} alt={buffet.name} />
              <Card.Body>
                <Card.Title>{buffet.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {buffet.hotelName}
                </Card.Subtitle>
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
                  to={`/reservation/${buffet.hotelId}/${buffet.id}`}
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
  );
}

export default BuffetList; 