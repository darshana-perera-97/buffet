import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Table,
  Alert,
  Modal,
  Form,
  Row,
  Col,
  Tabs,
  Tab,
  Pagination,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ManualReservation() {
  const navigate = useNavigate();
  const hotelId = localStorage.getItem("hotelId");
  const [buffets, setBuffets] = useState([]);
  const [reservations, setReservations] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [form, setForm] = useState({
    buffetName: "",
    packs: "",
    date: "",
    contactNumber: "",
    email: "",
  });

  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const [upcomingPage, setUpcomingPage] = useState(1);
  const [pastPage, setPastPage] = useState(1);
  const itemsPerPage = 5;

  const todayStr = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (!hotelId) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:5111/getBuffets")
      .then((res) => res.json())
      .then((data) => {
        setBuffets(data.filter((b) => b.hotelId === hotelId));
      });

    fetch("http://localhost:5111/getReservations")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((r) => r.hotelId === hotelId);
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        setReservations(filtered);
      });
  }, [navigate, hotelId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setError(null);

    const { buffetName, packs, date, contactNumber, email } = form;
    if (!buffetName || !packs || !date || !contactNumber || !email) {
      return setError("All fields are required");
    }

    if (new Date(date) < new Date(todayStr)) {
      return setError("Date cannot be in the past.");
    }

    const payload = {
      ...form,
      packs: parseInt(packs),
      hotelId,
    };

    fetch("http://localhost:5111/addReservation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        setReservations((prev) =>
          [...prev, data.reservation].sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          )
        );
        setShowAddModal(false);
        resetForm();
      })
      .catch(() => setError("Failed to add reservation"));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setError(null);

    const { buffetName, packs, date, contactNumber, email } = form;
    if (!buffetName || !packs || !date || !contactNumber || !email) {
      return setError("All fields are required");
    }

    const payload = {
      buffetName,
      packs: parseInt(packs),
      date,
      contactNumber,
      email,
    };

    fetch(`http://localhost:5111/updateReservation/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        const updated = reservations
          .map((r) => (r.ReservationId === editId ? data.reservation : r))
          .sort((a, b) => new Date(a.date) - new Date(b.date));
        setReservations(updated);
        setShowEditModal(false);
        setEditId(null);
        resetForm();
      });
  };

  const openEditModal = (resv) => {
    setEditId(resv.ReservationId);
    setForm({
      buffetName: resv.buffetName,
      packs: resv.packs,
      date: resv.date,
      contactNumber: resv.contactNumber,
      email: resv.email,
    });
    setShowEditModal(true);
  };

  const resetForm = () => {
    setForm({
      buffetName: "",
      packs: "",
      date: "",
      contactNumber: "",
      email: "",
    });
    setError(null);
  };

  const filteredReservations = reservations.filter((r) => {
    const matchSearch =
      (r.ReservationId?.toLowerCase() || "").includes(searchTerm) ||
      (r.buffetName?.toLowerCase() || "").includes(searchTerm) ||
      (r.contactNumber?.toLowerCase() || "").includes(searchTerm) ||
      (r.email?.toLowerCase() || "").includes(searchTerm);

    const matchDate = filterDate ? r.date === filterDate : true;

    return matchSearch && matchDate;
  });

  const upcoming = filteredReservations.filter(
    (r) => new Date(r.date) >= new Date(todayStr)
  );
  const past = filteredReservations.filter(
    (r) => new Date(r.date) < new Date(todayStr)
  );

  const paginate = (data, page) => {
    const start = (page - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  };

  const renderPagination = (total, page, setPage) => {
    const totalPages = Math.ceil(total / itemsPerPage);
    if (totalPages <= 1) return null;
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <Pagination>
        {pages.map((num) => (
          <Pagination.Item
            key={num}
            active={num === page}
            onClick={() => setPage(num)}
          >
            {num}
          </Pagination.Item>
        ))}
      </Pagination>
    );
  };

  const renderTable = (data, isUpcoming) => {
    if (data.length === 0)
      return <Alert variant="info">No reservations to show.</Alert>;

    const page = isUpcoming ? upcomingPage : pastPage;
    const setPage = isUpcoming ? setUpcomingPage : setPastPage;
    const pagedData = paginate(data, page);

    return (
      <>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Reservation ID</th>
              <th>Buffet</th>
              <th>Packs</th>
              <th>Date</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Media</th>
              {isUpcoming && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {pagedData.map((r) => (
              <tr key={r.ReservationId}>
                <td>{r.ReservationId}</td>
                <td>{r.buffetName}</td>
                <td>{r.packs}</td>
                <td>{r.date}</td>
                <td>{r.contactNumber}</td>
                <td>{r.email}</td>
                <td>{r.media}</td>
                {isUpcoming && (
                  <td>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => openEditModal(r)}
                    >
                      Edit
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
        {renderPagination(data.length, page, setPage)}
      </>
    );
  };

  return (
    <Container className="mt-5">
      <h2>Manual Reservations</h2>
      <Button
        variant="secondary"
        className="mb-4"
        onClick={() => navigate("/dashboard")}
      >
        ← Back to Dashboard
      </Button>

      <div className="mb-4 d-flex justify-content-between align-items-center">
        <Button variant="success" onClick={() => setShowAddModal(true)}>
          + Add Reservation
        </Button>
      </div>

      {/* Search and filter inputs */}
      <Row className="mb-4">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search by buffet, contact, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </Col>
        <Col md={4}>
          <Form.Control
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Button
            variant="outline-secondary"
            onClick={() => {
              setSearchTerm("");
              setFilterDate("");
            }}
          >
            Clear Filters
          </Button>
        </Col>
      </Row>

      <Tabs defaultActiveKey="upcoming" className="mb-3">
        <Tab eventKey="upcoming" title="Upcoming Bookings">
          {renderTable(upcoming, true)}
        </Tab>
        <Tab eventKey="past" title="Past Bookings">
          {renderTable(past, false)}
        </Tab>
      </Tabs>

      {/* Add Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Reservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleAdd}>
            <ReservationForm
              form={form}
              onChange={handleChange}
              buffets={buffets}
              minDate={todayStr}
            />
            <Button variant="success" type="submit">
              Add Reservation
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Reservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleEdit}>
            <ReservationForm
              form={form}
              onChange={handleChange}
              buffets={buffets}
            />
            <Button variant="warning" type="submit">
              Update Reservation
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

// Shared form component
const ReservationForm = ({ form, onChange, buffets, minDate }) => {
  const selectedBuffet = buffets.find((b) => b.buffetname === form.buffetName);
  const price = selectedBuffet?.price || 0;
  const totalCost = form.packs ? parseInt(form.packs) * price : 0;

  return (
    <Row>
      <Col md={6}>
        <Form.Group className="mb-3">
          <Form.Label>Buffet</Form.Label>
          <Form.Select
            name="buffetName"
            value={form.buffetName}
            onChange={onChange}
          >
            <option value="">Select Buffet</option>
            {buffets.map((b) => (
              <option key={b.buffetId} value={b.buffetname}>
                {b.buffetname} (₹{b.price})
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Col>

      <Col md={6}>
        <Form.Group className="mb-3">
          <Form.Label>Packs</Form.Label>
          <Form.Control
            type="number"
            name="packs"
            value={form.packs}
            onChange={onChange}
          />
        </Form.Group>

        {selectedBuffet && form.packs > 0 && (
          <div className="text-muted">
            💰 <strong>Total:</strong> ₹{totalCost}
          </div>
        )}
      </Col>

      <Col md={6}>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            min={minDate}
            value={form.date}
            onChange={onChange}
          />
        </Form.Group>
      </Col>

      <Col md={6}>
        <Form.Group className="mb-3">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control
            type="text"
            name="contactNumber"
            value={form.contactNumber}
            onChange={onChange}
          />
        </Form.Group>
      </Col>

      <Col md={12}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
          />
        </Form.Group>
      </Col>
    </Row>
  );
};

export default ManualReservation;
