import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

const ProductCard = ({ product }) => {
  const { addToCart, isInCart, getItemQuantity } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const getPrescriptionBadge = () => {
    if (product.requiresPrescription) {
      return <Badge bg="warning" className="mb-2">Prescription Required</Badge>;
    }
    return <Badge bg="success" className="mb-2">Over the Counter</Badge>;
  };

  const getStockStatus = () => {
    if (product.stock === 0) {
      return <Badge bg="danger">Out of Stock</Badge>;
    } else if (product.stock < 10) {
      return <Badge bg="warning">Low Stock</Badge>;
    }
    return <Badge bg="success">In Stock</Badge>;
  };

  return (
    <Card className="product-card h-100 shadow-sm">
      <Card.Img 
        variant="top" 
        src={product.image} 
        alt={product.name}
        className="product-image"
      />
      <Card.Body className="d-flex flex-column">
        <div className="mb-2">
          {getPrescriptionBadge()}
          {getStockStatus()}
        </div>
        
        <Card.Title as={Link} to={`/product/${product.id}`} className="text-decoration-none">
          {product.name}
        </Card.Title>
        
        <Card.Text className="text-muted small">
          {product.category} • {product.manufacturer}
        </Card.Text>
        
        <Card.Text className="flex-grow-1">
          {product.description.substring(0, 100)}...
        </Card.Text>
        
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="h5 text-primary mb-0">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-muted text-decoration-line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
          
          <div className="d-flex gap-2">
            <Button 
              variant="primary" 
              size="sm" 
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-grow-1"
            >
              {isInCart(product.id) ? 
                `In Cart (${getItemQuantity(product.id)})` : 
                'Add to Cart'
              }
            </Button>
            
            <Button 
              variant="outline-primary" 
              size="sm" 
              as={Link} 
              to={`/product/${product.id}`}
            >
              View
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;