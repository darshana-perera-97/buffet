import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import ReservationModal from "./ReservationModal"; // Import the modal component

const BuffetList = () => {
  const [buffets, setBuffets] = useState([]);
  const [selectedBuffet, setSelectedBuffet] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5111/getBuffets")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) =>
          b.buffetId.localeCompare(a.buffetId)
        );
        setBuffets(sorted);
      })
      .catch((err) => console.error("Error fetching buffets:", err));
  }, []);

  const openModal = (buffet) => {
    setSelectedBuffet(buffet);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedBuffet(null);
    setShowModal(false);
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">All Buffets</h2>
      <Row>
        {buffets.map((buffet) => (
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

      {selectedBuffet && (
        <ReservationModal
          show={showModal}
          handleClose={closeModal}
          buffet={selectedBuffet}
          hotelId={selectedBuffet.hotelId}
        />
      )}
    </Container>
  );
};

export default BuffetList;
