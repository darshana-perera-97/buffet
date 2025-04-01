import React, { useEffect, useState } from "react";
import { Container, Alert, Button, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const hotelId = localStorage.getItem("hotelId");
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");

    if (!userId || !hotelId) {
      navigate("/login");
    } else {
      setUser({ userId, hotelId, email, role });

      // Fetch hotel details
      fetch("http://localhost:5111/getHotels")
        .then((res) => res.json())
        .then((data) => {
          const found = data.find((h) => h.HotelId === hotelId);
          setHotel(found || null);
        })
        .catch(() => {
          setHotel(null);
        })
        .finally(() => setLoading(false));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <Container className="mt-5">
      <h2>Dashboard</h2>

      <Alert variant="info">
        <strong>User:</strong> {user.email} <br />
        <strong>Role:</strong> {user.role} <br />
        <strong>Hotel ID:</strong> {user.hotelId}
      </Alert>

      <div className="mb-4">
        <Button
          onClick={() => navigate(`/hotel/${user.hotelId}`)}
          variant="primary"
          className="me-2"
        >
          View Hotel Page
        </Button>
        <Button onClick={handleLogout} variant="danger">
          Logout
        </Button>
      </div>

      <h4 className="mt-4">Hotel Details</h4>
      <Button
        onClick={() => navigate("/buffets")}
        variant="success"
        className="me-2"
      >
        Manage Buffets
      </Button>
      <Button
        onClick={() => navigate("/manual")}
        variant="success"
        className="me-2"
      >
        Manual Reservation
      </Button>

      {loading ? (
        <Spinner animation="border" />
      ) : hotel ? (
        <div className="p-3 border rounded bg-light shadow-sm">
          <Row className="mb-2">
            <Col md={3}>
              <strong>Name:</strong>
            </Col>
            <Col>{hotel.HotelName}</Col>
          </Row>
          <Row className="mb-2">
            <Col md={3}>
              <strong>Location:</strong>
            </Col>
            <Col>{hotel.Location || "N/A"}</Col>
          </Row>
          <Row className="mb-2">
            <Col md={3}>
              <strong>Contact:</strong>
            </Col>
            <Col>{hotel.contactNumber || "N/A"}</Col>
          </Row>
          <Row className="mb-2">
            <Col md={3}>
              <strong>Status:</strong>
            </Col>
            <Col>{hotel.State}</Col>
          </Row>
          <Row className="mb-2">
            <Col md={3}>
              <strong>Description:</strong>
            </Col>
            <Col>{hotel.description || "N/A"}</Col>
          </Row>
          {hotel.FeaturedImage && (
            <div className="text-center mt-3">
              <img
                src={`http://localhost:5111${hotel.FeaturedImage}`}
                alt={hotel.HotelName}
                className="img-fluid rounded shadow"
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
            </div>
          )}
        </div>
      ) : (
        <Alert variant="warning">Hotel not found.</Alert>
      )}
    </Container>
  );
}

export default Dashboard;
