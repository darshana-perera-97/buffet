import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Navbar from "./Navbar";
import ReservationModal from "./ReservationModal";
import BASE_URL from "../config";

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
    <>
      {/* <Navbar /> */}

      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="animate__animated animate__fadeInDown">
          Welcome to <span className="text-accent">Buffet Booking</span>
        </h1>
        <p className="animate__animated animate__fadeInUp">
          Discover hotels and book delicious buffets with ease
        </p>
        <Button
          variant="light"
          size="lg"
          className="px-4 py-2 animate__animated animate__zoomIn"
          onClick={handleViewHotels}
        >
          <i className="bi bi-house-door-fill me-2"></i>Explore Hotels
        </Button>
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
    </>
  );
};

export default Landing;
