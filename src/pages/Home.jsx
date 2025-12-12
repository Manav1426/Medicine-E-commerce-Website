import React from 'react';
import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard.jsx';

const Home = () => {
  const featuredProducts = products.filter(product => product.originalPrice).slice(0, 4);
  const newArrivals = products.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-4 fw-bold mb-4">
                Your Health, Our Priority
              </h1>
              <p className="lead mb-4">
                Get authentic medicines delivered to your doorstep. 
                Fast, reliable, and trusted by thousands of customers.
              </p>
              <div className="d-flex gap-3">
                <Button as={Link} to="/products" variant="light" size="lg">
                  Shop Now
                </Button>
                <Button as={Link} to="/prescription" variant="outline-light" size="lg">
                  Upload Prescription
                </Button>
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <img 
                src="https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Healthcare"
                className="img-fluid rounded-3"
                style={{ maxHeight: '400px' }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="feature-card h-100">
                <Card.Body>
                  <div className="text-primary mb-3">
                    <i className="fas fa-shipping-fast fa-3x"></i>
                  </div>
                  <Card.Title>Fast Delivery</Card.Title>
                  <Card.Text>
                    Get your medicines delivered within 2-4 hours in metro cities 
                    and 1-2 days in other locations.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="feature-card h-100">
                <Card.Body>
                  <div className="text-primary mb-3">
                    <i className="fas fa-certificate fa-3x"></i>
                  </div>
                  <Card.Title>Authentic Products</Card.Title>
                  <Card.Text>
                    All medicines are sourced directly from manufacturers 
                    and authorized distributors.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="feature-card h-100">
                <Card.Body>
                  <div className="text-primary mb-3">
                    <i className="fas fa-user-md fa-3x"></i>
                  </div>
                  <Card.Title>Expert Consultation</Card.Title>
                  <Card.Text>
                    Get free consultation from our qualified pharmacists 
                    and healthcare experts.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="py-5 bg-light">
        <Container>
          <Row>
            <Col>
              <div className="text-center mb-5">
                <h2 className="display-6 fw-bold">Featured Products</h2>
                <p className="lead">Special offers and discounts on popular medicines</p>
              </div>
            </Col>
          </Row>
          <Row>
            {featuredProducts.map(product => (
              <Col key={product.id} md={6} lg={3} className="mb-4">
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
          <Row>
            <Col className="text-center">
              <Button as={Link} to="/products" variant="primary" size="lg">
                View All Products
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* New Arrivals */}
      <section className="py-5">
        <Container>
          <Row>
            <Col>
              <div className="text-center mb-5">
                <h2 className="display-6 fw-bold">New Arrivals</h2>
                <p className="lead">Latest additions to our medicine collection</p>
              </div>
            </Col>
          </Row>
          <Row>
            {newArrivals.map(product => (
              <Col key={product.id} md={6} lg={3} className="mb-4">
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Categories */}
      <section className="py-5 bg-light">
        <Container>
          <Row>
            <Col>
              <div className="text-center mb-5">
                <h2 className="display-6 fw-bold">Shop by Category</h2>
                <p className="lead">Find medicines by health condition</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6} lg={4} className="mb-4">
              <Card className="category-card h-100 text-center">
                <Card.Body>
                  <i className="fas fa-pills fa-3x text-primary mb-3"></i>
                  <Card.Title>Pain Relief</Card.Title>
                  <Card.Text>Headache, body ache, and fever medications</Card.Text>
                  <Button as={Link} to="/products?category=Pain Relief" variant="primary">
                    Shop Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <Card className="category-card h-100 text-center">
                <Card.Body>
                  <i className="fas fa-heart fa-3x text-danger mb-3"></i>
                  <Card.Title>Cardiovascular</Card.Title>
                  <Card.Text>Heart health and blood pressure medications</Card.Text>
                  <Button as={Link} to="/products?category=Cardiovascular" variant="primary">
                    Shop Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <Card className="category-card h-100 text-center">
                <Card.Body>
                  <i className="fas fa-leaf fa-3x text-success mb-3"></i>
                  <Card.Title>Vitamins & Supplements</Card.Title>
                  <Card.Text>Daily vitamins and health supplements</Card.Text>
                  <Button as={Link} to="/products?category=Vitamins" variant="primary">
                    Shop Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Newsletter */}
      <section className="py-5 bg-primary text-white">
        <Container>
          <Row>
            <Col lg={6} className="mx-auto text-center">
              <h3 className="mb-4">Stay Updated with Health Tips</h3>
              <p className="mb-4">
                Subscribe to our newsletter for health tips, medicine updates, and special offers.
              </p>
              <div className="d-flex gap-2">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Enter your email"
                />
                <Button variant="light">Subscribe</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;