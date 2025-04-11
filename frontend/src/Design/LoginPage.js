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
        setError("Login failed. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="login-page">
      <Container
        className="d-flex align-items-center justify-content-center min-vh-100"
      >
        <Card className="login-card fade-in">
          <Card.Body className="p-4 p-md-5">
            <div className="text-center mb-4">
              <h2 className="section-title mb-3">Welcome Back</h2>
              <p className="text-muted">Sign in to manage your buffet reservations</p>
            </div>

            {error && (
              <Alert variant="danger" className="mb-4">
                <i className="fas fa-exclamation-circle me-2"></i>
                {error}
              </Alert>
            )}

            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-4">
                <Form.Label>Email Address</Form.Label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <Form.Control
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Enter your email"
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-lock"></i>
                  </span>
                  <Form.Control
                    type="password"
                    required
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Enter your password"
                  />
                </div>
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                className="w-100 py-3 mb-3"
              >
                {loading ? (
                  <>
                    <Spinner size="sm" animation="border" className="me-2" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt me-2"></i>
                    Sign In
                  </>
                )}
              </Button>

              <div className="text-center">
                <small className="text-muted">
                  <i className="fas fa-shield-alt me-1"></i>
                  Your data is securely encrypted
                </small>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default LoginPage;
