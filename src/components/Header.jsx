import React, { useState } from 'react';
import { Navbar, Nav, Container, Badge, Dropdown, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const Header = () => {
  const { getCartItemCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${searchTerm}`);
      setSearchTerm('');
    }
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          <i className="fas fa-pills me-2"></i>
          HealthCare Pharmacy
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
            <Nav.Link as={Link} to="/prescription">Prescription</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>
          
          <Form className="d-flex me-3" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="me-2"
            />
            <Button variant="outline-light" type="submit">
              <i className="fas fa-search"></i>
            </Button>
          </Form>
          
          <Nav>
            <Nav.Link as={Link} to="/cart" className="position-relative">
              <i className="fas fa-shopping-cart"></i>
              {getCartItemCount() > 0 && (
                <Badge 
                  bg="danger" 
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {getCartItemCount()}
                </Badge>
              )}
            </Nav.Link>
            
            {isAuthenticated() ? (
              <Dropdown>
                <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                  <i className="fas fa-user me-2"></i>
                  {user?.name || user?.email}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile">
                    <i className="fas fa-user me-2"></i>Profile
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/orders">
                    <i className="fas fa-history me-2"></i>Order History
                  </Dropdown.Item>
                  {user?.role === 'admin' && (
                    <Dropdown.Item as={Link} to="/admin">
                      <i className="fas fa-cog me-2"></i>Admin Panel
                    </Dropdown.Item>
                  )}
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt me-2"></i>Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  <i className="fas fa-sign-in-alt me-1"></i>Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  <i className="fas fa-user-plus me-1"></i>Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;