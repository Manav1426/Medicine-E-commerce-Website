import React from 'react';
import { Container, Row, Col, Card, Button, Alert, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated()) {
      navigate('/login?redirect=checkout');
    } else {
      navigate('/checkout');
    }
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.18; // 18% GST
  };

  const deliveryCharge = calculateSubtotal() >= 500 ? 0 : 50;

  if (items.length === 0) {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <Card className="p-5">
              <i className="fas fa-shopping-cart fa-4x text-muted mb-4"></i>
              <h3>Your cart is empty</h3>
              <p className="text-muted mb-4">
                Looks like you haven't added any medicines to your cart yet.
              </p>
              <Button as={Link} to="/products" variant="primary" size="lg">
                Continue Shopping
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        <Col md={8}>
          <Card>
            <Card.Header>
              <h4 className="mb-0">Shopping Cart ({items.length} items)</h4>
            </Card.Header>
            <Card.Body>
              {items.map(item => (
                <div key={item.id} className="cart-item">
                  <Row className="align-items-center">
                    <Col md={2}>
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="img-fluid rounded"
                        style={{ height: '80px', objectFit: 'cover' }}
                      />
                    </Col>
                    <Col md={4}>
                      <h6>{item.name}</h6>
                      <p className="text-muted small mb-1">{item.category}</p>
                      <p className="text-muted small mb-0">By {item.manufacturer}</p>
                      {item.requiresPrescription && (
                        <Badge bg="warning" className="mt-1">Prescription Required</Badge>
                      )}
                    </Col>
                    <Col md={2}>
                      <div className="quantity-controls">
                        <button 
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button 
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </Col>
                    <Col md={2} className="text-end">
                      <p className="fw-bold mb-0">₹{item.price * item.quantity}</p>
                      <p className="text-muted small">₹{item.price} each</p>
                    </Col>
                    <Col md={2} className="text-end">
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </div>
              ))}
              
              <div className="mt-3 pt-3 border-top">
                <Button 
                  variant="outline-secondary" 
                  onClick={clearCart}
                  className="me-2"
                >
                  Clear Cart
                </Button>
                <Button as={Link} to="/products" variant="outline-primary">
                  Continue Shopping
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="sticky-top">
            <Card.Header>
              <h5 className="mb-0">Order Summary</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>₹{calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax (18% GST):</span>
                <span>₹{calculateTax().toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Delivery:</span>
                <span>
                  {deliveryCharge === 0 ? (
                    <Badge bg="success">Free</Badge>
                  ) : (
                    `₹${deliveryCharge}`
                  )}
                </span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong>₹{(calculateSubtotal() + calculateTax() + deliveryCharge).toFixed(2)}</strong>
              </div>
              
              {deliveryCharge > 0 && (
                <Alert variant="info" className="small">
                  Add ₹{(500 - calculateSubtotal()).toFixed(2)} more for free delivery!
                </Alert>
              )}
              
              <Button 
                variant="primary" 
                size="lg" 
                className="w-100 mb-2"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
              
              <div className="text-center mt-3">
                <i className="fas fa-shield-alt text-success me-2"></i>
                <small className="text-muted">Secure checkout with SSL encryption</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;