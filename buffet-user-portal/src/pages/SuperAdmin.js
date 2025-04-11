import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Modal, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SuperAdmin() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newHotel, setNewHotel] = useState({
    name: '',
    location: '',
    description: '',
    contactNumber: '',
    image: ''
  });
  const [addHotelError, setAddHotelError] = useState('');
  const [addHotelSuccess, setAddHotelSuccess] = useState('');

  useEffect(() => {
    // Check if user is already logged in
    const loggedIn = localStorage.getItem('superAdminLoggedIn');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
      fetchHotels();
    }
  }, []);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/hotels');
      const data = await response.json();
      setHotels(data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      setError('Failed to fetch hotels. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Check for hardcoded credentials
    if (username === 'a' && password === 'a') {
      setIsLoggedIn(true);
      localStorage.setItem('superAdminLoggedIn', 'true');
      fetchHotels();
    } else {
      setError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('superAdminLoggedIn');
  };

  const handleAddHotel = async (e) => {
    e.preventDefault();
    setAddHotelError('');
    setAddHotelSuccess('');

    try {
      const response = await fetch('/api/createHotel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newHotel),
      });

      if (!response.ok) {
        throw new Error('Failed to create hotel');
      }

      const data = await response.json();
      setHotels([...hotels, data]);
      setAddHotelSuccess('Hotel added successfully!');
      setShowAddModal(false);
      setNewHotel({
        name: '',
        location: '',
        description: '',
        contactNumber: '',
        image: ''
      });
    } catch (error) {
      console.error('Error adding hotel:', error);
      setAddHotelError('Failed to add hotel. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHotel({
      ...newHotel,
      [name]: value
    });
  };

  if (!isLoggedIn) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Header className="bg-primary text-white">
                <h4 className="mb-0">Super Admin Login</h4>
              </Card.Header>
              <Card.Body>
                {error && (
                  <Alert variant="danger" className="mb-4">
                    {error}
                  </Alert>
                )}
                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <div className="d-grid">
                    <Button type="submit" variant="primary" size="lg">
                      Login
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="section-title">Hotel Management</h1>
        <div>
          <Button variant="primary" className="me-2" onClick={() => setShowAddModal(true)}>
            <i className="fas fa-plus me-2"></i>Add Hotel
          </Button>
          <Button variant="outline-danger" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt me-2"></i>Logout
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <Card className="shadow-sm">
          <Card.Body>
            <div className="table-responsive">
              <Table hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Contact</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {hotels.length > 0 ? (
                    hotels.map(hotel => (
                      <tr key={hotel.id}>
                        <td>{hotel.id}</td>
                        <td>{hotel.name}</td>
                        <td>{hotel.location}</td>
                        <td>{hotel.contactNumber}</td>
                        <td>
                          <Button variant="outline-primary" size="sm" className="me-2">
                            <i className="fas fa-edit"></i>
                          </Button>
                          <Button variant="outline-danger" size="sm">
                            <i className="fas fa-trash"></i>
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">No hotels found</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      )}

      {/* Add Hotel Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Hotel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {addHotelError && (
            <Alert variant="danger" className="mb-4">
              {addHotelError}
            </Alert>
          )}
          {addHotelSuccess && (
            <Alert variant="success" className="mb-4">
              {addHotelSuccess}
            </Alert>
          )}
          <Form onSubmit={handleAddHotel}>
            <Form.Group className="mb-3">
              <Form.Label>Hotel Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newHotel.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={newHotel.location}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={newHotel.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                name="contactNumber"
                value={newHotel.contactNumber}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={newHotel.image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
              />
            </Form.Group>
            <div className="d-grid">
              <Button type="submit" variant="primary">
                Add Hotel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default SuperAdmin; 