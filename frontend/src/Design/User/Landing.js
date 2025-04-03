import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Navbar from "./Navbar";
import ReservationModal from "./ReservationModal";

const Landing = () => {
  const [hotels, setHotels] = useState([]);
  const [buffets, setBuffets] = useState([]);
  const [selectedBuffet, setSelectedBuffet] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5111/getHotels")
      .then((res) => res.json())
      .then((data) => setHotels(data))
      .catch((err) => console.error("Failed to load hotels:", err));

    fetch("http://localhost:5111/getBuffets")
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
      <Navbar />

      {/* Hero Section */}
      <div
        className="text-white text-center py-5"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/your-hero-bg.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="display-4 fw-bold">Welcome to Buffet Booking</h1>
        <p className="lead">
          Discover hotels and book delicious buffets with ease
        </p>
        <Button variant="light" size="lg" onClick={handleViewHotels}>
          <i className="bi bi-house-door-fill me-2"></i>Explore Hotels
        </Button>
      </div>

      {/* Featured Hotels - Card View */}
      <Container className="my-5">
        <h2 className="text-center mb-4">🌟 Featured Hotels</h2>
        <Row>
          {hotels.slice(0, 4).map((hotel) => (
            <Col md={6} lg={3} key={hotel.HotelId}>
              <Card className="mb-4 shadow-sm h-100">
                {hotel.FeaturedImage && (
                  <Card.Img
                    variant="top"
                    src={`http://localhost:5111${hotel.FeaturedImage}`}
                    alt={hotel.HotelName}
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                )}
                <Card.Body>
                  <Card.Title className="text-primary fw-semibold">
                    {hotel.HotelName}
                  </Card.Title>
                  <Card.Text
                    className="text-muted"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {hotel.description?.slice(0, 80)}...
                  </Card.Text>
                  <div className="d-grid mt-3">
                    <Button
                      variant="primary"
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
        <div className="text-center mt-3">
          <Button variant="outline-primary" onClick={handleViewHotels}>
            View All Hotels
          </Button>
        </div>
      </Container>

      {/* Latest Buffets */}
      <Container className="my-5">
        <h2 className="text-center mb-4">🍽️ Latest Buffets</h2>
        <Row>
          {buffets.slice(0, 4).map((buffet) => (
            <Col md={6} lg={3} key={buffet.buffetId}>
              <Card className="mb-4 shadow-sm h-100">
                <Card.Body>
                  <Card.Title className="text-primary fw-semibold">
                    {buffet.buffetname}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    ₹{buffet.price}
                  </Card.Subtitle>
                  <Card.Text
                    style={{
                      fontSize: "0.9rem",
                      maxHeight: "80px",
                      overflowY: "auto",
                    }}
                  >
                    {buffet.items?.slice(0, 5).join(", ") + "..."}
                  </Card.Text>
                  <div className="d-grid mt-3">
                    <Button variant="success" onClick={() => openModal(buffet)}>
                      Book Now
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="text-center mt-4">
          <Button variant="outline-success" onClick={handleViewBuffets}>
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
