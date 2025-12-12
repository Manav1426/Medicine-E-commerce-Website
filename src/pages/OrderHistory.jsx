import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Modal, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext.jsx';

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Load orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
  }, []);

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { bg: 'success', text: 'Confirmed' },
      processing: { bg: 'warning', text: 'Processing' },
      shipped: { bg: 'info', text: 'Shipped' },
      delivered: { bg: 'primary', text: 'Delivered' },
      cancelled: { bg: 'danger', text: 'Cancelled' }
    };
    
    const config = statusConfig[status] || { bg: 'secondary', text: 'Unknown' };
    return <Badge bg={config.bg}>{config.text}</Badge>;
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };



  if (orders.length === 0) {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <Card className="p-5">
              <i className="fas fa-history fa-4x text-muted mb-4"></i>
              <h3>No Orders Yet</h3>
              <p className="text-muted mb-4">
                You haven't placed any orders yet. Start shopping to see your order history.
              </p>
              <Button variant="primary" size="lg" href="/products">
                Start Shopping
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
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Order History</h2>
            <Badge bg="secondary">{orders.length} orders</Badge>
          </div>

          {orders.map(order => {
            const totalAmount = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            return (
              <Card key={order.order_id} className="mb-3">
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={2}>
                    <div>
                        <strong>Order #{order.order_id}</strong>
                      <br />
                      <small className="text-muted">
                          {new Date(order.created_at).toLocaleDateString()}
                      </small>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div>
                        <strong>₹{totalAmount.toFixed(2)}</strong>
                      <br />
                      <small className="text-muted">{order.items.length} items</small>
                    </div>
                  </Col>
                  <Col md={2}>
                      <Badge bg="success">Confirmed</Badge>
                  </Col>
                  <Col md={3}>
                    <div>
                        <strong>Order Date:</strong> {new Date(order.created_at).toLocaleDateString()}
                      <br />
                      <small className="text-muted">
                          {order.items.length} items ordered
                      </small>
                    </div>
                  </Col>
                  <Col md={2} className="text-end">
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => handleViewDetails(order)}
                    >
                      View Details
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            );
          })}
        </Col>
      </Row>

      {/* Order Details Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <div>
              <Row className="mb-3">
                <Col md={6}>
                  <strong>Order ID:</strong> #{selectedOrder.order_id}
                </Col>
                <Col md={6}>
                  <strong>Status:</strong> <Badge bg="success">Confirmed</Badge>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <strong>Order Date:</strong> {new Date(selectedOrder.created_at).toLocaleDateString()}
                </Col>
                <Col md={6}>
                  <strong>Total:</strong> ₹{selectedOrder.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                </Col>
              </Row>

              <h6 className="mb-3">Items Ordered:</h6>
              {selectedOrder.items.map(item => (
                <div key={item.product_id} className="d-flex justify-content-between align-items-center mb-2 p-2 bg-light rounded">
                  <div>
                    <strong>{item.product_name}</strong>
                    <br />
                    <small className="text-muted">Quantity: {item.quantity}</small>
                  </div>
                  <div className="text-end">
                    <strong>₹{(item.price * item.quantity).toFixed(2)}</strong>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default OrderHistory;