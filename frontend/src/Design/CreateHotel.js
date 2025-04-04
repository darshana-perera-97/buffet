import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

import BASE_URL from "./config"; // adjust the path if your file is elsewhere

function CreateHotel({ onHotelCreated }) {
  const [hotelData, setHotelData] = useState({
    HotelName: "",
    description: "",
    Location: "",
    contactNumber: "",
    State: "Live",
    FeaturedImage: null,
  });

  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotelData({ ...hotelData, [name]: value });
  };

  const handleFileChange = (e) => {
    setHotelData({ ...hotelData, FeaturedImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (let key in hotelData) {
      formData.append(key, hotelData[key]);
    }

    try {
      const res = await fetch(`${BASE_URL}/createHotel`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResponse(data);

      if (data?.hotel?.HotelId) {
        // Show alert with HotelId
        alert(`Hotel created successfully!\nHotel ID: ${data.hotel.HotelId}`);
        // Call parent callback to signal that hotel is created
        if (onHotelCreated) {
          onHotelCreated();
        }
      }
    } catch (err) {
      setResponse({ error: "Failed to connect to backend." });
    }
  };

  return (
    <Container className="mt-4">
      <h2>Create Hotel</h2>
      {response?.message && (
        <Alert variant="success">
          {response.message}
          <br />
          <strong>Hotel ID:</strong> {response.hotel?.HotelId}
          <br />
          <strong>Image Path:</strong> {response.hotel?.FeaturedImage}
        </Alert>
      )}
      {response?.error && <Alert variant="danger">{response.error}</Alert>}

      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Hotel Name</Form.Label>
              <Form.Control name="HotelName" onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control name="description" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Featured Image</Form.Label>
              <Form.Control
                type="file"
                name="FeaturedImage"
                onChange={handleFileChange}
                accept="image/*"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control name="Location" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control name="contactNumber" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>State</Form.Label>
              <Form.Select
                name="State"
                onChange={handleChange}
                defaultValue="Live"
              >
                <option value="Live">Live</option>
                <option value="Suspended">Suspended</option>
              </Form.Select>
            </Form.Group>

            <Button type="submit" variant="primary">
              Create Hotel
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default CreateHotel;
