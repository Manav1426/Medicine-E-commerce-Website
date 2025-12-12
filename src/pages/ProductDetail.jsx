import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Tabs, Tab, Alert, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext.jsx';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return (
      <Container>
        <Alert variant="danger" className="text-center">
          Product not found
        </Alert>
      </Container>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  const getPrescriptionAlert = () => {
    if (product.requiresPrescription) {
      return (
        <Alert variant="warning">
          <i className="fas fa-prescription-bottle me-2"></i>
          This medicine requires a valid prescription. Please upload your prescription during checkout.
        </Alert>
      );
    }
    return null;
  };

  const getStockStatus = () => {
    if (product.stock === 0) {
      return <Badge bg="danger">Out of Stock</Badge>;
    } else if (product.stock < 10) {
      return <Badge bg="warning">Low Stock ({product.stock} left)</Badge>;
    }
    return <Badge bg="success">In Stock ({product.stock} available)</Badge>;
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Img 
              variant="top" 
              src={product.image} 
              alt={product.name}
              style={{ height: '400px', objectFit: 'cover' }}
            />
          </Card>
        </Col>
        
        <Col md={6}>
          <div className="product-info">
            <h1 className="mb-3">{product.name}</h1>
            
            <div className="mb-3">
              <Badge bg="primary" className="me-2">{product.category}</Badge>
              {getStockStatus()}
              {product.requiresPrescription && (
                <Badge bg="warning" className="ms-2">Prescription Required</Badge>
              )}
            </div>

            <div className="mb-3">
              <span className="text-muted">Manufacturer: </span>
              <strong>{product.manufacturer}</strong>
            </div>

            <div className="mb-4">
              <span className="h3 text-primary">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-muted text-decoration-line-through ms-2">
                  ₹{product.originalPrice}
                </span>
              )}
              {product.originalPrice && (
                <Badge bg="success" className="ms-2">
                  Save ₹{product.originalPrice - product.price}
                </Badge>
              )}
            </div>

            {getPrescriptionAlert()}

            <div className="mb-4">
              <Form.Group>
                <Form.Label>Quantity</Form.Label>
                <Form.Select 
                  value={quantity} 
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  style={{ width: '100px' }}
                >
                  {[...Array(Math.min(product.stock, 10))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>

            <div className="d-flex gap-3 mb-4">
              <Button 
                variant="primary" 
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-grow-1"
              >
                <i className="fas fa-cart-plus me-2"></i>
                {isInCart(product.id) ? 
                  `In Cart (${getItemQuantity(product.id)})` : 
                  'Add to Cart'
                }
              </Button>
              
              <Button 
                variant="success" 
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex-grow-1"
              >
                <i className="fas fa-bolt me-2"></i>
                Buy Now
              </Button>
            </div>

            <div className="delivery-info">
              <h6>Delivery Information</h6>
              <ul className="list-unstyled">
                <li><i className="fas fa-shipping-fast text-primary me-2"></i>Free delivery on orders above ₹500</li>
                <li><i className="fas fa-clock text-primary me-2"></i>Express delivery in 2-4 hours</li>
                <li><i className="fas fa-undo text-primary me-2"></i>Easy returns within 7 days</li>
              </ul>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <Tabs activeKey={activeTab} onSelect={setActiveTab}>
            <Tab eventKey="description" title="Description">
              <div className="p-4">
                <p>{product.description}</p>
                <h6>Key Benefits:</h6>
                <ul>
                  <li>Fast and effective relief</li>
                  <li>Safe for regular use</li>
                  <li>Trusted by healthcare professionals</li>
                  <li>Quality assured</li>
                </ul>
              </div>
            </Tab>
            
            <Tab eventKey="ingredients" title="Ingredients">
              <div className="p-4">
                <h6>Active Ingredients:</h6>
                <ul>
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            </Tab>
            
            <Tab eventKey="dosage" title="Dosage & Usage">
              <div className="p-4">
                <h6>Recommended Dosage:</h6>
                <p>{product.dosage}</p>
                <h6>Important Instructions:</h6>
                <ul>
                  <li>Take as directed by your healthcare provider</li>
                  <li>Do not exceed the recommended dose</li>
                  <li>Store in a cool, dry place</li>
                  <li>Keep away from children</li>
                </ul>
              </div>
            </Tab>
            
            <Tab eventKey="warnings" title="Warnings & Side Effects">
              <div className="p-4">
                <h6>Possible Side Effects:</h6>
                <ul>
                  {product.sideEffects.map((effect, index) => (
                    <li key={index}>{effect}</li>
                  ))}
                </ul>
                <h6>Warnings:</h6>
                <ul>
                  {product.warnings.map((warning, index) => (
                    <li key={index}>{warning}</li>
                  ))}
                </ul>
              </div>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;