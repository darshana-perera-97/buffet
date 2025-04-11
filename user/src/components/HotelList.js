import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../config"; // adjust the path if your file is elsewhere

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}/getHotels`)
      .then((res) => res.json())
      .then((data) => setHotels(data))
      .catch((err) => console.error("Error fetching hotels:", err));
  }, []);

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">All Hotels</h2>
      <Row>
        {hotels.map((hotel) => (
          <Col md={4} key={hotel.HotelId}>
            <Card className="mb-4">
              <Card.Img
                variant="top"
                src={`${BASE_URL}${hotel.FeaturedImage}`}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{hotel.HotelName}</Card.Title>
                <Card.Text>{hotel.description}</Card.Text>
                <Button onClick={() => navigate(`/hotels/${hotel.HotelId}`)}>
                  View Hotel
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HotelList;
