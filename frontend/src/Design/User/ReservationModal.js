import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import BASE_URL from "../config"; // adjust the path if your file is elsewhere

const ReservationModal = ({ show, handleClose, buffet, hotelId }) => {
  const [packs, setPacks] = useState(1);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    if (buffet?.price && packs > 0) {
      setTotalCost(buffet.price * packs);
    }
  }, [packs, buffet]);

  const handleSubmit = () => {
    const reservation = {
      buffetName: buffet.buffetname,
      packs,
      date,
      hotelId,
      contactNumber,
      email,
      media: "app", // <- as requested
    };

    fetch(`${BASE_URL}/addReservation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reservation),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Reservation created successfully!");
        handleClose();
      })
      .catch(() => alert("Failed to create reservation"));
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Book Buffet: <strong>{buffet?.buffetname}</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Number of People</Form.Label>
            <Form.Control
              type="number"
              min={1}
              value={packs}
              onChange={(e) => setPacks(Number(e.target.value))}
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              min={new Date().toISOString().slice(0, 10)} // ✅ today's date
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <div className="mt-4">
            <strong>Selected Pack:</strong> {packs} <br />
            <strong>Price Per Person:</strong> ₹{buffet?.price} <br />
            <strong>Total Cost:</strong> ₹{totalCost}
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Confirm Booking
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReservationModal;
