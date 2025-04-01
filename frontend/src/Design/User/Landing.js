import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";
import Navbar from "./Navbar";
import ReservationModal from "./ReservationModal"; // ✅ Step 1

const Landing = () => {
  const [hotels, setHotels] = useState([]);
  const [buffets, setBuffets] = useState([]);
  const [selectedBuffet, setSelectedBuffet] = useState(null); // ✅ Step 2
  const [showModal, setShowModal] = useState(false); // ✅ Step 2
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
      <div
        className="bg-dark text-white text-center py-5"
        style={{
          backgroundImage: `url('/your-hero-bg.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="display-4">Welcome to Buffet Booking</h1>
        <p>Discover hotels and book delicious buffets with ease</p>
        <Button variant="light" onClick={handleViewHotels}>
          Explore Hotels
        </Button>
      </div>

      <Container className="my-5">
        <h2 className="text-center mb-4">Featured Hotels</h2>
        <Carousel>
          {hotels.slice(0, 5).map((hotel) => (
            <Carousel.Item key={hotel.HotelId}>
              <img
                className="d-block w-100"
                src={`http://localhost:5111${hotel.FeaturedImage}`}
                alt={hotel.HotelName}
                style={{ height: "400px", objectFit: "cover" }}
              />
              <Carousel.Caption>
                <h3>{hotel.HotelName}</h3>
                <p>{hotel.description}</p>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/hotels/${hotel.HotelId}`)}
                >
                  View Details
                </Button>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
        <div className="text-center mt-3">
          <Button onClick={handleViewHotels}>View All Hotels</Button>
        </div>
      </Container>

      <Container className="my-5">
        <h2 className="text-center mb-4">Latest Buffets</h2>
        <Row>
          {buffets.slice(0, 4).map((buffet) => (
            <Col md={3} key={buffet.buffetId}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>{buffet.buffetname}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    ₹{buffet.price}
                  </Card.Subtitle>
                  <Card.Text>{buffet.items.join(", ")}</Card.Text>
                  <Button variant="success" onClick={() => openModal(buffet)}>
                    Book Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="text-center mt-3">
          <Button onClick={handleViewBuffets}>View All Buffets</Button>
        </div>
      </Container>

      {selectedBuffet && (
        <ReservationModal
          show={showModal}
          handleClose={closeModal}
          buffet={selectedBuffet}
          hotelId={selectedBuffet.hotelId} // used in the modal
        />
      )}
    </>
  );
};

export default Landing;
