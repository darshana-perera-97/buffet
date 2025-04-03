import React, { useState } from "react";
import CreateHotel from "../CreateHotel";
import AllHotels from "../AllHotels";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SuperAdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [showCreateHotel, setShowCreateHotel] = useState(false);
  const [hotelCreated, setHotelCreated] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = formData;

    if (username === "a" && password === "a") {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid credentials");
    }
  };

  const handleCreateHotelClick = () => {
    setShowCreateHotel(true);
    setHotelCreated(false);
  };

  const handleHotelCreated = () => {
    setShowCreateHotel(false);
    setHotelCreated(true);
  };

  return (
    <div className="container mt-5">
      {!isLoggedIn ? (
        <div className="row justify-content-center">
          <div className="col-md-4">
            <h3 className="text-center mb-4">Admin Login</h3>
            <form onSubmit={handleLogin}>
              <div className="form-group mb-3">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Hotel Management</h2>
            <button
              className="btn btn-success"
              onClick={handleCreateHotelClick}
              disabled={hotelCreated}
            >
              Add New Hotel
            </button>
          </div>

          {showCreateHotel && (
            <CreateHotel onHotelCreated={handleHotelCreated} />
          )}

          <AllHotels />
        </>
      )}
    </div>
  );
}
