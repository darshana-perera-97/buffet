import React, { useEffect, useState } from "react";
import {
  Container,
  Alert,
  Button,
  Row,
  Col,
  Spinner,
  Card,
  Badge,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BASE_URL from "./config"; // adjust the path if your file is elsewhere

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

      fetch(`${BASE_URL}/getHotels`)
        .then((res) => res.json())
        .then((data) => {
          const found = data.find((h) => h.HotelId === hotelId);
          setHotel(found || null);
        })
        .catch(() => setHotel(null))
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
      {/* Header */}
      <Row className="align-items-center mb-4">
        <Col>
          <h2 className="mb-0">Welcome to your Dashboard</h2>
          <small className="text-muted">Hotel Admin Panel</small>
        </Col>
        <Col className="text-end">
          <Button variant="outline-danger" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-1"></i> Logout
          </Button>
        </Col>
      </Row>

      {/* Quick Action Cards */}
      <Row className="mb-4">
        <Col md={4} className="mb-3">
          <Card
            className="text-center h-100 shadow-sm"
            onClick={() => navigate(`/hotel/${user.hotelId}`)}
            style={{ cursor: "pointer" }}
          >
            <Card.Body>
              <div className="mb-3">
                <i className="bi bi-building display-4 text-primary"></i>
              </div>
              <h5>View Hotel</h5>
              <p className="text-muted small">
                See hotel info and manage users.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card
            className="text-center h-100 shadow-sm"
            onClick={() => navigate("/buffets")}
            style={{ cursor: "pointer" }}
          >
            <Card.Body>
              <div className="mb-3">
                <i className="bi bi-list-ul display-4 text-success"></i>
              </div>
              <h5>Manage Buffets</h5>
              <p className="text-muted small">Create or update buffet menus.</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card
            className="text-center h-100 shadow-sm"
            onClick={() => navigate("/manual")}
            style={{ cursor: "pointer" }}
          >
            <Card.Body>
              <div className="mb-3">
                <i className="bi bi-pencil-square display-4 text-warning"></i>
              </div>
              <h5>Manual Reservation</h5>
              <p className="text-muted small">
                Book or manage reservations manually.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* User Info Card */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h5 className="mb-3">User Info</h5>
          <Row>
            <Col md={4}>
              <strong>Email:</strong>
              <div>{user.email}</div>
            </Col>
            <Col md={4}>
              <strong>Role:</strong>
              <div>
                <Badge bg="info" className="text-uppercase">
                  {user.role}
                </Badge>
              </div>
            </Col>
            <Col md={4}>
              <strong>Hotel ID:</strong>
              <div>{user.hotelId}</div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Hotel Details */}
      <h4 className="mb-3">Hotel Details</h4>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : hotel ? (
        <Card className="shadow-sm">
          <Card.Body>
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
              <Col>
                <Badge bg={hotel.State === "Live" ? "success" : "secondary"}>
                  {hotel.State}
                </Badge>
              </Col>
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
                  src={`${BASE_URL}${hotel.FeaturedImage}`}
                  alt={hotel.HotelName}
                  className="img-fluid rounded shadow"
                  style={{ maxHeight: "300px", objectFit: "cover" }}
                />
              </div>
            )}
          </Card.Body>
        </Card>
      ) : (
        <Alert variant="warning">Hotel not found.</Alert>
      )}
    </Container>
  );
}

export default Dashboard;
