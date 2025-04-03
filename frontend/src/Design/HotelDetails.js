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
} from "react-bootstrap";

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
    fetch("http://localhost:5111/getHotels")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((h) => h.HotelId === id);
        if (found) setHotel(found);
        else setError("Hotel not found");
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch hotel details");
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    fetch("http://localhost:5111/getUsers")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((u) => u.HotelId === id);
        setUsers(filtered);
      });
  }, [id]);

  const handleAddUser = () => {
    setAddingUser(true);
    setUserError(null);

    fetch("http://localhost:5111/addUserToHotel", {
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
      .catch(() => setUserError("Failed to add user"))
      .finally(() => setAddingUser(false));
  };

  const handleDeleteUser = (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    fetch(`http://localhost:5111/deleteUser/${userId}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) alert(data.error);
        else setUsers((prev) => prev.filter((u) => u.userId !== userId));
      })
      .catch(() => alert("Failed to delete user"));
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      {/* Header with Hotel Name and Back Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <i className="bi bi-building me-2"></i>
          {hotel.HotelName}
        </h2>
        <Link to="/admin">
          <Button variant="outline-secondary">
            <i className="bi bi-arrow-left"></i> Back
          </Button>
        </Link>
      </div>

      {/* Hotel Info Card */}
      <Card className="shadow-sm mb-4">
        {hotel.FeaturedImage && (
          <Card.Img
            variant="top"
            src={`http://localhost:5111${hotel.FeaturedImage}`}
            alt={hotel.HotelName}
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        )}
        <Card.Body>
          <Row className="mb-2">
            <Col md={3}>
              <strong>
                <i className="bi bi-geo-alt-fill me-1"></i>Location:
              </strong>
            </Col>
            <Col>{hotel.Location || "N/A"}</Col>
          </Row>
          <Row className="mb-2">
            <Col md={3}>
              <strong>
                <i className="bi bi-telephone-fill me-1"></i>Contact:
              </strong>
            </Col>
            <Col>{hotel.contactNumber || "N/A"}</Col>
          </Row>
          <Row className="mb-2">
            <Col md={3}>
              <strong>
                <i className="bi bi-check-circle-fill me-1"></i>Status:
              </strong>
            </Col>
            <Col>{hotel.State}</Col>
          </Row>
          <Row>
            <Col md={3}>
              <strong>
                <i className="bi bi-info-circle-fill me-1"></i>Description:
              </strong>
            </Col>
            <Col>{hotel.description || "N/A"}</Col>
          </Row>
        </Card.Body>
      </Card>

      {/* User Management Section */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">
          <i className="bi bi-people-fill me-2"></i>Hotel Users
        </h4>
        <Button onClick={() => setShowModal(true)}>
          <i className="bi bi-person-plus-fill me-1"></i> Add User
        </Button>
      </div>

      {users.length > 0 ? (
        <Table striped bordered hover responsive className="shadow-sm">
          <thead className="table-dark">
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
                <td>{u.role}</td>
                <td className="text-center">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteUser(u.userId)}
                  >
                    <i className="bi bi-trash-fill"></i> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Alert variant="info" className="text-center">
          No users added for this hotel.
        </Alert>
      )}

      {/* Add User Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-person-plus-fill me-2"></i>Add Hotel User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {userError && <Alert variant="danger">{userError}</Alert>}
          <Form>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formRole" className="mb-3">
              <Form.Label>Role</Form.Label>
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
                <option value="receptionist">Receptionist</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setShowModal(false)}
            disabled={addingUser}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAddUser}
            disabled={addingUser}
          >
            {addingUser ? "Adding..." : "Add User"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default HotelDetails;
