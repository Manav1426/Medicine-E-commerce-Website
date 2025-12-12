import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const { user } = useAuth(); // user contains email, title, etc.
  const [formData, setFormData] = useState({
    full_name: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    country: '',
    payment_method: 'cod',
    requires_prescription: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!user || !user.email) {
      setError("You must be logged in to place an order.");
      return;
    }

    const payload = {
      items: items.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
      address: {
        full_name: formData.full_name,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zip_code,
        country: formData.country,
      },
      payment_method: formData.payment_method,
      requires_prescription: formData.requires_prescription,
    };

    try {
      const response = await fetch('http://localhost:8000/api/order/place/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // allows Django to access session
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to place order');
      }

      const data = await response.json();
      setSuccess(`Order placed successfully! Order ID: ${data.order_id}`);
      clearCart();
      navigate('/order-success');
    } catch (err) {
      setError(`❌ Error placing order: ${err.message}`);
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8}>
          <h2>Checkout</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="fullName" className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="address" className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group controlId="city" className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="state" className="mb-3">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="zip_code" className="mb-3">
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="zip_code"
                    value={formData.zip_code}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="country" className="mb-3">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="paymentMethod" className="mb-3">
              <Form.Label>Payment Method</Form.Label>
              <Form.Select
                name="payment_method"
                value={formData.payment_method}
                onChange={handleChange}
              >
                <option value="cod">Cash on Delivery</option>
                <option value="upi">UPI</option>
                <option value="card">Card</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="prescription" className="mb-3">
              <Form.Check
                type="checkbox"
                label="Requires Prescription?"
                name="requires_prescription"
                checked={formData.requires_prescription}
                onChange={handleChange}
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Place Order
            </Button>
          </Form>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Cart Summary</Card.Title>
              {items.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <>
                  {items.map((item, index) => (
                    <div key={index}>
                      <strong>{item.name}</strong> x {item.quantity}
                      <hr />
                    </div>
                  ))}
                  <h5>Total: ₹{getCartTotal()}</h5>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
