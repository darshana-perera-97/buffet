import React, { useEffect, useState } from "react";
import { Card, Col, Row, Container, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AllHotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchHotels = () => {
    fetch("http://localhost:5111/getHotels")
      .then((res) => res.json())
      .then((data) => {
        setHotels(data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError("Failed to load hotels");
        setLoading(false);
      });
  };

  useEffect(() => {
    // Initial fetch
    fetchHotels();

    // Set interval to refetch every 1 minute
    const intervalId = setInterval(fetchHotels, 60000); // 60000ms = 1 min

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  const goToDetails = (hotelId) => {
    navigate(`/hotel/${hotelId}`);
  };

  return (
    <Container className="mt-5">
      <h2>All Hotels</h2>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {hotels.map((hotel) => (
          <Col md={4} key={hotel.HotelId} className="mb-4">
            <Card
              onClick={() => goToDetails(hotel.HotelId)}
              style={{ cursor: "pointer" }}
            >
              {hotel.FeaturedImage && (
                <Card.Img
                  variant="top"
                  src={`http://localhost:5111${hotel.FeaturedImage}`}
                  alt={hotel.HotelName}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <Card.Body>
                <Card.Title>{hotel.HotelName}</Card.Title>
                <Card.Text>
                  <strong>Location:</strong> {hotel.Location || "N/A"} <br />
                  <strong>Status:</strong> {hotel.State}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default AllHotels;
