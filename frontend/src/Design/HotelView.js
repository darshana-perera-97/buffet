import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
  Badge,
  Modal,
  Form,
} from 'react-bootstrap';
import BASE_URL from './config';

function HotelView() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [reservation, setReservation] = useState({
    date: '',
    time: '',
    guests: 1,
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (loading) {
        setError("Request timed out. Please try again.");
        setLoading(false);
      }
    }, 10000);

    fetch(`${BASE_URL}/getHotels`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((h) => h.HotelId === id);
        if (found) {
          setHotel(found);
        } else {
          setError("Hotel not found");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching hotel:", err);
        setError("Failed to fetch hotel details. Please try again later.");
        setLoading(false);
      });

    return () => clearTimeout(timeoutId);
  }, [id, loading]);

  const handleReservationSubmit = (e) => {
    e.preventDefault();
    // Add reservation logic here
    setShowReservationModal(false);
  };

  if (loading) {
    return (
      <Container className="loading-spinner">
        <div className="text-center">
          <Spinner animation="border" role="status" />
          <p className="mt-3 text-primary">Loading hotel details...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="shadow-sm">
          <i className="fas fa-exclamation-circle me-2"></i>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4 fade-in">
      {/* Hotel Header */}
      <div className="text-center mb-5">
        <h1 className="section-title">
          <i className="fas fa-hotel me-2 text-primary"></i>
          {hotel.HotelName}
        </h1>
        <Badge bg={hotel.State === "Active" ? "success" : "danger"} className="fs-6">
          {hotel.State}
        </Badge>
      </div>

      {/* Hotel Image and Info */}
      <Row className="mb-5">
        <Col md={6}>
          {hotel.FeaturedImage && (
            <Card className="shadow-sm hotel-card h-100">
              <Card.Img
                variant="top"
                src={`${BASE_URL}${hotel.FeaturedImage}`}
                alt={hotel.HotelName}
                style={{ height: '400px', objectFit: 'cover' }}
              />
            </Card>
          )}
        </Col>
        <Col md={6}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h3 className="text-primary mb-4">
                <i className="fas fa-info-circle me-2"></i>
                Hotel Information
              </h3>
              <div className="mb-3">
                <strong className="text-primary">
                  <i className="fas fa-map-marker-alt me-2"></i>Location:
                </strong>
                <p className="ms-4 mb-2">{hotel.Location || "N/A"}</p>
              </div>
              <div className="mb-3">
                <strong className="text-primary">
                  <i className="fas fa-phone me-2"></i>Contact:
                </strong>
                <p className="ms-4 mb-2">{hotel.contactNumber || "N/A"}</p>
              </div>
              <div className="mb-3">
                <strong className="text-primary">
                  <i className="fas fa-align-left me-2"></i>Description:
                </strong>
                <p className="ms-4 mb-2">{hotel.description || "N/A"}</p>
              </div>
              <Button
                variant="primary"
                size="lg"
                className="w-100 mt-3"
                onClick={() => setShowReservationModal(true)}
              >
                <i className="fas fa-calendar-check me-2"></i>
                Make a Reservation
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Reservation Modal */}
      <Modal
        show={showReservationModal}
        onHide={() => setShowReservationModal(false)}
        centered
        className="fade-in"
      >
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            <i className="fas fa-calendar-plus me-2"></i>
            Make a Reservation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleReservationSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-calendar"></i>
                </span>
                <Form.Control
                  type="date"
                  value={reservation.date}
                  onChange={(e) =>
                    setReservation({ ...reservation, date: e.target.value })
                  }
                  required
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Time</Form.Label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-clock"></i>
                </span>
                <Form.Control
                  type="time"
                  value={reservation.time}
                  onChange={(e) =>
                    setReservation({ ...reservation, time: e.target.value })
                  }
                  required
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Number of Guests</Form.Label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-users"></i>
                </span>
                <Form.Control
                  type="number"
                  min="1"
                  value={reservation.guests}
                  onChange={(e) =>
                    setReservation({ ...reservation, guests: e.target.value })
                  }
                  required
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-user"></i>
                </span>
                <Form.Control
                  type="text"
                  value={reservation.name}
                  onChange={(e) =>
                    setReservation({ ...reservation, name: e.target.value })
                  }
                  required
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-envelope"></i>
                </span>
                <Form.Control
                  type="email"
                  value={reservation.email}
                  onChange={(e) =>
                    setReservation({ ...reservation, email: e.target.value })
                  }
                  required
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-phone"></i>
                </span>
                <Form.Control
                  type="tel"
                  value={reservation.phone}
                  onChange={(e) =>
                    setReservation({ ...reservation, phone: e.target.value })
                  }
                  required
                />
              </div>
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit" size="lg">
                <i className="fas fa-check me-2"></i>
                Confirm Reservation
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => setShowReservationModal(false)}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default HotelView; 