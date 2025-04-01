import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5111/getHotels")
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
                src={`http://localhost:5111${hotel.FeaturedImage}`}
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
