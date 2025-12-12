import React, { useState } from 'react';
import { Container, Row, Col, Card, Nav, Tab, Table, Button, Form, Modal, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext.jsx';
import { products } from '../data/products';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orders] = useState(JSON.parse(localStorage.getItem('orders') || '[]'));

  // Check if user is admin
  if (!user || user.role !== 'admin') {
    return (
      <Container>
        <Alert variant="danger" className="text-center">
          Access denied. Admin privileges required.
        </Alert>
      </Container>
    );
  }

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const getTotalRevenue = () => {
    return orders.reduce((total, order) => total + order.total, 0);
  };

  const getTotalOrders = () => {
    return orders.length;
  };

  const getLowStockProducts = () => {
    return products.filter(product => product.stock < 10);
  };

  const getTopSellingProducts = () => {
    const productSales = {};
    orders.forEach(order => {
      order.items.forEach(item => {
        productSales[item.id] = (productSales[item.id] || 0) + item.quantity;
      });
    });
    
    return Object.entries(productSales)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([id, sales]) => ({
        product: products.find(p => p.id === parseInt(id)),
        sales
      }));
  };

  return (
    <Container fluid>
      <Row>
        <Col md={3} className="admin-sidebar">
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link 
                eventKey="overview" 
                active={activeTab === 'overview'}
                onClick={() => setActiveTab('overview')}
              >
                <i className="fas fa-tachometer-alt me-2"></i>
                Overview
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                eventKey="products" 
                active={activeTab === 'products'}
                onClick={() => setActiveTab('products')}
              >
                <i className="fas fa-pills me-2"></i>
                Products
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                eventKey="orders" 
                active={activeTab === 'orders'}
                onClick={() => setActiveTab('orders')}
              >
                <i className="fas fa-shopping-cart me-2"></i>
                Orders
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                eventKey="customers" 
                active={activeTab === 'customers'}
                onClick={() => setActiveTab('customers')}
              >
                <i className="fas fa-users me-2"></i>
                Customers
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                eventKey="analytics" 
                active={activeTab === 'analytics'}
                onClick={() => setActiveTab('analytics')}
              >
                <i className="fas fa-chart-bar me-2"></i>
                Analytics
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>

        <Col md={9} className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Admin Dashboard</h2>
            <div className="text-muted">Welcome back, {user.name}</div>
          </div>

          <Tab.Container activeKey={activeTab}>
            <Tab.Content>
              <Tab.Pane eventKey="overview">
                <Row className="mb-4">
                  <Col md={3}>
                    <Card className="stats-card">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-2">Total Revenue</h6>
                            <h3 className="mb-0">₹{getTotalRevenue().toFixed(2)}</h3>
                          </div>
                          <i className="fas fa-rupee-sign fa-2x opacity-75"></i>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={3}>
                    <Card className="stats-card">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-2">Total Orders</h6>
                            <h3 className="mb-0">{getTotalOrders()}</h3>
                          </div>
                          <i className="fas fa-shopping-cart fa-2x opacity-75"></i>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={3}>
                    <Card className="stats-card">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-2">Total Products</h6>
                            <h3 className="mb-0">{products.length}</h3>
                          </div>
                          <i className="fas fa-pills fa-2x opacity-75"></i>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={3}>
                    <Card className="stats-card">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-2">Low Stock Items</h6>
                            <h3 className="mb-0">{getLowStockProducts().length}</h3>
                          </div>
                          <i className="fas fa-exclamation-triangle fa-2x opacity-75"></i>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Card>
                      <Card.Header>
                        <h5 className="mb-0">Top Selling Products</h5>
                      </Card.Header>
                      <Card.Body>
                        <Table hover>
                          <thead>
                            <tr>
                              <th>Product</th>
                              <th>Sales</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getTopSellingProducts().map(({ product, sales }, index) => (
                              <tr key={index}>
                                <td>{product?.name || 'N/A'}</td>
                                <td>{sales}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card>
                      <Card.Header>
                        <h5 className="mb-0">Low Stock Alert</h5>
                      </Card.Header>
                      <Card.Body>
                        <Table hover>
                          <thead>
                            <tr>
                              <th>Product</th>
                              <th>Stock</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getLowStockProducts().map(product => (
                              <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>
                                  <span className="badge bg-warning">{product.stock}</span>
                                </td>
                                <td>
                                  <Button size="sm" variant="outline-primary">
                                    Restock
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Tab.Pane>

              <Tab.Pane eventKey="products">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4>Product Management</h4>
                  <Button variant="primary">
                    <i className="fas fa-plus me-2"></i>
                    Add New Product
                  </Button>
                </div>
                <Card>
                  <Card.Body>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Category</th>
                          <th>Price</th>
                          <th>Stock</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map(product => (
                          <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>₹{product.price}</td>
                            <td>
                              <span className={`badge ${product.stock < 10 ? 'bg-warning' : 'bg-success'}`}>
                                {product.stock}
                              </span>
                            </td>
                            <td>
                              <Button 
                                size="sm" 
                                variant="outline-primary" 
                                className="me-2"
                                onClick={() => handleEditProduct(product)}
                              >
                                Edit
                              </Button>
                              <Button size="sm" variant="outline-danger">
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              <Tab.Pane eventKey="orders">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4>Order Management</h4>
                  <Form.Select style={{ width: '200px' }}>
                    <option>All Orders</option>
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </Form.Select>
                </div>
                <Card>
                  <Card.Body>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Date</th>
                          <th>Customer</th>
                          <th>Total</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map(order => (
                          <tr key={order.id}>
                            <td>#{order.id}</td>
                            <td>{new Date(order.date).toLocaleDateString()}</td>
                            <td>{order.shippingAddress.name}</td>
                            <td>₹{order.total.toFixed(2)}</td>
                            <td>
                              <span className="badge bg-success">{order.status}</span>
                            </td>
                            <td>
                              <Button size="sm" variant="outline-primary" className="me-2">
                                View
                              </Button>
                              <Button size="sm" variant="outline-warning">
                                Update
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              <Tab.Pane eventKey="customers">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4>Customer Management</h4>
                  <Button variant="primary">
                    <i className="fas fa-download me-2"></i>
                    Export Customer Data
                  </Button>
                </div>
                <Card>
                  <Card.Body>
                    <div className="text-center p-5">
                      <i className="fas fa-users fa-4x text-muted mb-3"></i>
                      <h5>Customer management coming soon</h5>
                      <p className="text-muted">This feature will be available in the next update.</p>
                    </div>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              <Tab.Pane eventKey="analytics">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4>Analytics & Reports</h4>
                  <Button variant="primary">
                    <i className="fas fa-download me-2"></i>
                    Generate Report
                  </Button>
                </div>
                <Card>
                  <Card.Body>
                    <div className="text-center p-5">
                      <i className="fas fa-chart-line fa-4x text-muted mb-3"></i>
                      <h5>Analytics dashboard coming soon</h5>
                      <p className="text-muted">Detailed analytics and reports will be available in the next update.</p>
                    </div>
                  </Card.Body>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>

      {/* Edit Product Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={selectedProduct.name}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={selectedProduct.category}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      defaultValue={selectedProduct.price}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                      type="number"
                      defaultValue={selectedProduct.stock}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  defaultValue={selectedProduct.description}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;