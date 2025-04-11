import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import ReservationModal from "./ReservationModal"; // <-- import modal
import BASE_URL from "../config"; // adjust the path if your file is elsewhere

const HotelDetail = () => {
  const { id } = useParams(); // HotelId from URL
  const [hotel, setHotel] = useState(null);
  const [buffets, setBuffets] = useState([]);
  const [selectedBuffet, setSelectedBuffet] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch hotel details
    fetch(`${BASE_URL}/getReservations`)
      .then((res) => res.json())
      .then((hotels) => {
        const foundHotel = hotels.find((h) => h.HotelId === id);
        setHotel(foundHotel);
      })
      .catch(() => console.error("Failed to fetch hotel"));

    // Fetch buffets for the hotel
    fetch(`${BASE_URL}/getBuffets`)
      .then((res) => res.json())
      .then((allBuffets) => {
        const filtered = allBuffets.filter((b) => b.hotelId === id);
        setBuffets(filtered);
      })
      .catch(() => console.error("Failed to fetch buffets"));
  }, [id]);

  const openModal = (buffet) => {
    setSelectedBuffet(buffet);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedBuffet(null);
    setShowModal(false);
  };

  if (!hotel) {
    return <Container className="mt-5">Loading hotel...</Container>;
  }

  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col md={6}>
          <img
            src={`${BASE_URL}${hotel.FeaturedImage}`}
            alt={hotel.HotelName}
            className="img-fluid rounded"
          />
        </Col>
        <Col md={6}>
          <h2>{hotel.HotelName}</h2>
          <p>{hotel.description}</p>
          <p>
            <strong>Location:</strong> {hotel.Location}
          </p>
          <p>
            <strong>State:</strong> {hotel.State}
          </p>
          <p>
            <strong>Contact:</strong> {hotel.contactNumber}
          </p>
        </Col>
      </Row>

      <h3 className="mb-4">Available Buffets</h3>
      <Row>
        {buffets.length > 0 ? (
          buffets.map((buffet) => (
            <Col md={4} key={buffet.buffetId}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>{buffet.buffetname}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    ₹{buffet.price}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Meal Type:</strong> {buffet.mealtype} <br />
                    <strong>Items:</strong> {buffet.items.join(", ")}
                  </Card.Text>
                  <Button variant="success" onClick={() => openModal(buffet)}>
                    Book Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-muted">No buffets available for this hotel.</p>
        )}
      </Row>

      {selectedBuffet && (
        <ReservationModal
          show={showModal}
          handleClose={closeModal}
          buffet={selectedBuffet}
          hotelId={id}
        />
      )}
    </Container>
  );
};

export default HotelDetail;
