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
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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

    fetch("http://localhost:5111/getBuffets")
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

    fetch("http://localhost:5111/addBuffet", {
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

    fetch(`http://localhost:5111/deleteBuffet/${buffetId}`, {
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
    <Container className="mt-5">
      <h2>Manage Buffets</h2>
      <Button
        variant="secondary"
        className="mb-4"
        onClick={() => navigate("/dashboard")}
      >
        ← Back to Dashboard
      </Button>

      {/* Buffet Form */}
      <Form onSubmit={handleSubmit} className="mb-4">
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
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price (₹)</Form.Label>
              <Form.Control
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
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
              <Form.Label>Items (comma separated)</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={form.items}
                onChange={(e) => setForm({ ...form, items: e.target.value })}
                placeholder="e.g., Chicken Biryani, Paneer Curry, Salad"
              />
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" variant="success">
          Add Buffet
        </Button>
      </Form>

      {/* Buffet List */}
      <h5>Available Buffets</h5>
      {buffets.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Buffet Name</th>
              <th>Price</th>
              <th>Meal Type</th>
              <th>Items</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {buffets.map((b) => (
              <tr key={b.buffetId}>
                <td>{b.buffetname}</td>
                <td>₹{b.price}</td>
                <td>
                  <Badge bg="info">{b.mealtype}</Badge>
                </td>
                <td>
                  {b.items.map((item, idx) => (
                    <Badge key={idx} bg="secondary" className="me-1 mb-1">
                      {item}
                    </Badge>
                  ))}
                </td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(b.buffetId)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Alert variant="info">No buffets added yet.</Alert>
      )}
    </Container>
  );
}

export default Buffets;
