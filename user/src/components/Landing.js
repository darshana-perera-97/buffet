import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Navbar from "./Navbar";
import ReservationModal from "./ReservationModal";
import BASE_URL from "../config";
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const [hotels, setHotels] = useState([]);
  const [buffets, setBuffets] = useState([]);
  const [selectedBuffet, setSelectedBuffet] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}/getHotels`)
      .then((res) => res.json())
      .then((data) => setHotels(data))
      .catch((err) => console.error("Failed to load hotels:", err));

    fetch(`${BASE_URL}/getBuffets`)
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) =>
          b.buffetId.localeCompare(a.buffetId)
        );
        setBuffets(sorted);
      })
      .catch((err) => console.error("Failed to load buffets:", err));
  }, []);

  const handleViewHotels = () => navigate("/hotelList");
  const handleViewBuffets = () => navigate("/buffetList");

  const openModal = (buffet) => {
    setSelectedBuffet(buffet);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedBuffet(null);
    setShowModal(false);
  };

  return (
    <div className="landing-page">
      <div className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col lg={6} className="mb-5 mb-lg-0">
              <h1 className="hero-title">
                Discover the Finest
                <span className="highlight"> Buffet </span>
                Experiences
              </h1>
              <p className="hero-text">
                Indulge in a world of culinary excellence with our curated selection of 
                premium buffet experiences at top hotels. Book your perfect dining 
                experience today.
              </p>
              <div className="hero-buttons">
                <Button 
                  as={Link} 
                  to="/hotels" 
                  className="btn-primary-custom me-3"
                >
                  Explore Hotels
                </Button>
                <Button 
                  as={Link} 
                  to="/buffets" 
                  variant="outline-light"
                  className="btn-outline-custom"
                >
                  View Buffets
                </Button>
              </div>
              <div className="hero-stats mt-5">
                <div className="stat-item">
                  <h3>50+</h3>
                  <p>Hotels</p>
                </div>
                <div className="stat-item">
                  <h3>100+</h3>
                  <p>Buffets</p>
                </div>
                <div className="stat-item">
                  <h3>10k+</h3>
                  <p>Happy Customers</p>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="hero-image-container">
                <img 
                  src="/images/hero-buffet.jpg" 
                  alt="Luxury Buffet" 
                  className="hero-image"
                />
                <div className="floating-card card-1">
                  <i className="fas fa-star text-warning"></i>
                  <span>Top Rated</span>
                </div>
                <div className="floating-card card-2">
                  <i className="fas fa-utensils text-primary"></i>
                  <span>Best Selection</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Featured Hotels */}
      <Container className="my-5">
        <h2 className="text-center section-title">🌟 Featured Hotels</h2>
        <Row>
          {hotels.slice(0, 4).map((hotel) => (
            <Col md={6} lg={3} key={hotel.HotelId}>
              <Card className="mb-4 shadow-sm h-100 border-0 card-custom">
                {hotel.FeaturedImage && (
                  <Card.Img
                    variant="top"
                    src={`${BASE_URL}${hotel.FeaturedImage}`}
                    alt={hotel.HotelName}
                    className="card-img-top"
                  />
                )}
                <Card.Body>
                  <Card.Title className="card-title">
                    {hotel.HotelName}
                  </Card.Title>
                  <Card.Text className="card-text">
                    {hotel.description?.slice(0, 80)}...
                  </Card.Text>
                  <div className="d-grid">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => navigate(`/hotels/${hotel.HotelId}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="text-center mt-4">
          <Button variant="primary" onClick={handleViewHotels}>
            View All Hotels
          </Button>
        </div>
      </Container>

      {/* Latest Buffets */}
      <Container className="my-5">
        <h2 className="text-center section-title">🍽️ Latest Buffets</h2>
        <Row>
          {buffets.slice(0, 4).map((buffet) => (
            <Col md={6} lg={3} key={buffet.buffetId}>
              <Card className="mb-4 shadow-sm h-100 border-0 card-custom">
                <Card.Body>
                  <Card.Title className="card-title">
                    {buffet.buffetname}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    ₹{buffet.price}
                  </Card.Subtitle>
                  <Card.Text className="buffet-text-scroll">
                    {buffet.items?.slice(0, 5).join(", ") + "..."}
                  </Card.Text>
                  <div className="d-grid">
                    <Button variant="primary" onClick={() => openModal(buffet)}>
                      Book Now
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="text-center mt-4">
          <Button variant="outline-primary" onClick={handleViewBuffets}>
            View All Buffets
          </Button>
        </div>
      </Container>

      {/* Reservation Modal */}
      {selectedBuffet && (
        <ReservationModal
          show={showModal}
          handleClose={closeModal}
          buffet={selectedBuffet}
          hotelId={selectedBuffet.hotelId}
        />
      )}
    </div>
  );
};

export default Landing;
