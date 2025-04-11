import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <Container className="py-5 text-center">
      <div className="display-1 text-primary mb-4">404</div>
      <h1 className="mb-4">Page Not Found</h1>
      <p className="lead mb-4">
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>
      <Button as={Link} to="/" variant="primary" size="lg">
        Go to Homepage
      </Button>
    </Container>
  );
}

export default NotFound; 