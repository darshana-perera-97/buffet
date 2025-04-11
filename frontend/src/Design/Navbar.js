import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function NavigationBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    
    if (userId) {
      setIsLoggedIn(true);
      setUserRole(role || '');
    } else {
      setIsLoggedIn(false);
      setUserRole('');
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('hotelId');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <i className="fas fa-utensils me-2 text-purple"></i>
          <span className="fw-bold">Buffet Reservation</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/" className="mx-2">
                  <i className="fas fa-home me-1"></i> Home
                </Nav.Link>
                <Nav.Link as={Link} to="/buffets" className="mx-2">
                  <i className="fas fa-concierge-bell me-1"></i> Buffets
                </Nav.Link>
                <Nav.Link as={Link} to="/reservations" className="mx-2">
                  <i className="fas fa-calendar-check me-1"></i> Reservations
                </Nav.Link>
                {userRole === 'hotel' && (
                  <Nav.Link as={Link} to="/hotel" className="mx-2">
                    <i className="fas fa-hotel me-1"></i> Hotel Management
                  </Nav.Link>
                )}
                {userRole === 'superadmin' && (
                  <Nav.Link as={Link} to="/superadmin" className="mx-2">
                    <i className="fas fa-cog me-1"></i> Super Admin
                  </Nav.Link>
                )}
                <Dropdown align="end" className="ms-2">
                  <Dropdown.Toggle variant="outline-light" id="dropdown-user">
                    <i className="fas fa-user-circle me-1"></i> Account
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/profile">
                      <i className="fas fa-user me-2"></i> Profile
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt me-2"></i> Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="mx-2">
                  <i className="fas fa-sign-in-alt me-1"></i> Login
                </Nav.Link>
                <Button as={Link} to="/register" variant="outline-light" className="ms-2">
                  <i className="fas fa-user-plus me-1"></i> Register
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar; 