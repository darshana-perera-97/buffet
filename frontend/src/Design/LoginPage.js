import React, { useState } from "react";
import { Container, Form, Button, Alert, Spinner, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BASE_URL from "./config"; // adjust the path if your file is elsewhere

function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          // Store in localStorage
          localStorage.setItem("userId", data.userId);
          localStorage.setItem("hotelId", data.HotelId);
          localStorage.setItem("email", data.email);
          localStorage.setItem("role", data.role);

          // Redirect to dashboard
          navigate("/dashboard");
        }
      })
      .catch(() => {
        setError("Login failed. Try again.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ width: "100%", maxWidth: "400px" }} className="p-4 shadow">
        <h3 className="mb-4 text-center">Hotel User Login</h3>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="w-100"
          >
            {loading ? <Spinner size="sm" animation="border" /> : "Login"}
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default LoginPage;
