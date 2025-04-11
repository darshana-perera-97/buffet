import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Button,
  Spinner,
  Alert,
  Row,
  Col,
  Table,
  Modal,
  Form,
  Card,
  Badge,
} from "react-bootstrap";
import BASE_URL from "./config"; // adjust the path if your file is elsewhere

function HotelDetails() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ email: "", password: "", role: "" });
  const [addingUser, setAddingUser] = useState(false);
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    // Set a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (loading) {
        setError("Request timed out. Please try again.");
        setLoading(false);
      }
    }, 10000); // 10 seconds timeout

    fetch(`${BASE_URL}/getHotels`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((h) => h.HotelId === id);
        if (found) {
          setHotel(found);
        } else {
          setError("Hotel not found");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching hotel:", err);
        setError("Failed to fetch hotel details. Please try again later.");
        setLoading(false);
      });

    return () => clearTimeout(timeoutId);
  }, [id, loading]);

  useEffect(() => {
    fetch(`${BASE_URL}/getUsers`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((u) => u.HotelId === id);
        setUsers(filtered);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, [id]);

  const handleAddUser = () => {
    setAddingUser(true);
    setUserError(null);

    fetch(`${BASE_URL}/addUserToHotel`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newUser, HotelId: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setUserError(data.error);
        } else {
          setUsers((prev) => [...prev, data.user]);
          setShowModal(false);
          setNewUser({ email: "", password: "", role: "" });
        }
      })
      .catch((err) => {
        console.error("Error adding user:", err);
        setUserError("Failed to add user. Please try again.");
      })
      .finally(() => setAddingUser(false));
  };

  const handleDeleteUser = (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    fetch(`${BASE_URL}/deleteUser/${userId}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) alert(data.error);
        else setUsers((prev) => prev.filter((u) => u.userId !== userId));
      })
      .catch((err) => {
        console.error("Error deleting user:", err);
        alert("Failed to delete user. Please try again.");
      });
  };

  if (loading) {
    return (
      <Container className="loading-spinner">
        <div className="text-center">
          <Spinner animation="border" role="status" />
          <p className="mt-3 text-primary">Loading hotel details...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="shadow-sm">
          <i className="fas fa-exclamation-circle me-2"></i>
          {error}
        </Alert>
        <Button as={Link} to="/admin" variant="outline-primary" className="mt-3">
          <i className="fas fa-arrow-left me-2"></i>
          Back to Hotels
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4 fade-in">
      {/* Header with Hotel Name and Back Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="section-title m-0">
          <i className="fas fa-hotel me-2 text-primary"></i>
          {hotel.HotelName}
        </h2>
        <Link to="/admin">
          <Button variant="outline-primary">
            <i className="fas fa-arrow-left me-2"></i> Back
          </Button>
        </Link>
      </div>

      {/* Hotel Info Card */}
      <Card className="shadow-sm mb-4 hotel-card">
        {hotel.FeaturedImage && (
          <Card.Img
            variant="top"
            src={`${BASE_URL}${hotel.FeaturedImage}`}
            alt={hotel.HotelName}
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        )}
        <Card.Body>
          <Row className="mb-3">
            <Col md={3}>
              <strong className="text-primary">
                <i className="fas fa-map-marker-alt me-2"></i>Location:
              </strong>
            </Col>
            <Col>{hotel.Location || "N/A"}</Col>
          </Row>
          <Row className="mb-3">
            <Col md={3}>
              <strong className="text-primary">
                <i className="fas fa-phone me-2"></i>Contact:
              </strong>
            </Col>
            <Col>{hotel.contactNumber || "N/A"}</Col>
          </Row>
          <Row className="mb-3">
            <Col md={3}>
              <strong className="text-primary">
                <i className="fas fa-check-circle me-2"></i>Status:
              </strong>
            </Col>
            <Col>
              <Badge bg={hotel.State === "Active" ? "success" : "danger"}>
                {hotel.State}
              </Badge>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <strong className="text-primary">
                <i className="fas fa-info-circle me-2"></i>Description:
              </strong>
            </Col>
            <Col>{hotel.description || "N/A"}</Col>
          </Row>
        </Card.Body>
      </Card>

      {/* User Management Section */}
      <Card className="shadow-sm mb-4">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">
            <i className="fas fa-users me-2"></i>Hotel Users
          </h4>
          <Button onClick={() => setShowModal(true)} variant="primary">
            <i className="fas fa-user-plus me-2"></i> Add User
          </Button>
        </Card.Header>
        <Card.Body>
          {users.length > 0 ? (
            <div className="table-responsive">
              <Table hover className="mb-0">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Role</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.userId}>
                      <td>{u.email}</td>
                      <td>
                        <Badge bg="info">{u.role}</Badge>
                      </td>
                      <td className="text-center">
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDeleteUser(u.userId)}
                          className="d-flex align-items-center mx-auto"
                        >
                          <i className="fas fa-trash-alt me-1"></i> Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <Alert variant="info" className="text-center mb-0">
              <i className="fas fa-info-circle me-2"></i>
              No users added for this hotel.
            </Alert>
          )}
        </Card.Body>
      </Card>

      {/* Add User Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fas fa-user-plus me-2 text-primary"></i>Add Hotel User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {userError && (
            <Alert variant="danger">
              <i className="fas fa-exclamation-circle me-2"></i>
              {userError}
            </Alert>
          )}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-envelope"></i>
                </span>
                <Form.Control
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  placeholder="Enter email address"
                  required
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-lock"></i>
                </span>
                <Form.Control
                  type="password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  placeholder="Enter password"
                  required
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-user-tag"></i>
                </span>
                <Form.Select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                  required
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="staff">Staff</option>
                </Form.Select>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAddUser}
            disabled={addingUser}
          >
            {addingUser ? (
              <>
                <Spinner size="sm" animation="border" className="me-2" />
                Adding...
              </>
            ) : (
              <>
                <i className="fas fa-plus me-2"></i>
                Add User
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default HotelDetails;
