import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  Button,
  Table,
  Alert,
  Row,
  Col,
  Badge,
  Card,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BASE_URL from "./config"; // adjust the path if your file is elsewhere

function Buffets() {
  const [buffets, setBuffets] = useState([]);
  const [form, setForm] = useState({
    buffetname: "",
    price: "",
    items: "",
    mealtype: "Lunch",
  });
  const [error, setError] = useState(null);
  const [hotelId, setHotelId] = useState(null);
  const navigate = useNavigate();

  // Fetch hotel ID and buffets
  useEffect(() => {
    const hotel = localStorage.getItem("hotelId");
    if (!hotel) {
      navigate("/login");
      return;
    }
    setHotelId(hotel);

    fetch(`${BASE_URL}/getBuffets`)
      .then((res) => res.json())
      .then((data) => {
        const hotelBuffets = data.filter((b) => b.hotelId === hotel);
        setBuffets(hotelBuffets);
      });
  }, [navigate]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const itemsArray = form.items
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);

    const payload = {
      ...form,
      price: parseFloat(form.price),
      items: itemsArray,
      hotelId,
    };

    fetch(`${BASE_URL}/addBuffet`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setBuffets((prev) => [...prev, data.buffet]);
          setForm({ buffetname: "", price: "", items: "", mealtype: "Lunch" });
        }
      })
      .catch(() => setError("Failed to add buffet"));
  };

  // Handle delete buffet
  const handleDelete = (buffetId) => {
    if (!window.confirm("Are you sure you want to delete this buffet?")) return;

    fetch(`${BASE_URL}/deleteBuffet/${buffetId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setBuffets((prev) => prev.filter((b) => b.buffetId !== buffetId));
        }
      })
      .catch(() => alert("Failed to delete buffet"));
  };

  return (
    <Container className="mt-5 fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="section-title m-0">Manage Buffets</h2>
        <Button
          variant="outline-primary"
          className="d-flex align-items-center"
          onClick={() => navigate("/dashboard")}
        >
          <i className="fas fa-arrow-left me-2"></i>
          Back to Dashboard
        </Button>
      </div>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h3 className="mb-4">Add New Buffet</h3>
          <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Buffet Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={form.buffetname}
                    onChange={(e) =>
                      setForm({ ...form, buffetname: e.target.value })
                    }
                    placeholder="Enter buffet name"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Price (₹)</Form.Label>
                  <Form.Control
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="Enter price"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Meal Type</Form.Label>
                  <Form.Select
                    value={form.mealtype}
                    onChange={(e) => setForm({ ...form, mealtype: e.target.value })}
                  >
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Menu Items</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    value={form.items}
                    onChange={(e) => setForm({ ...form, items: e.target.value })}
                    placeholder="Enter menu items (comma separated)"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button type="submit" variant="primary" className="mt-3">
              <i className="fas fa-plus me-2"></i>
              Add Buffet
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Body>
          <h3 className="mb-4">Available Buffets</h3>
          {buffets.length > 0 ? (
            <div className="table-responsive">
              <Table hover className="mb-0">
                <thead>
                  <tr>
                    <th>Buffet Name</th>
                    <th>Price</th>
                    <th>Meal Type</th>
                    <th>Menu Items</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {buffets.map((b) => (
                    <tr key={b.buffetId}>
                      <td className="fw-bold">{b.buffetname}</td>
                      <td>₹{b.price}</td>
                      <td>
                        <Badge bg="info">{b.mealtype}</Badge>
                      </td>
                      <td>
                        <div className="d-flex flex-wrap gap-2">
                          {b.items.map((item, idx) => (
                            <Badge key={idx} bg="secondary">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(b.buffetId)}
                          className="d-flex align-items-center"
                        >
                          <i className="fas fa-trash-alt me-1"></i>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <Alert variant="info" className="mb-0">
              <i className="fas fa-info-circle me-2"></i>
              No buffets added yet. Start by adding a new buffet above.
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Buffets;
