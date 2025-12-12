import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, InputGroup, Card, Pagination } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { products, categories, getProductsByCategory, searchProducts } from '../data/products';
import ProductCard from '../components/ProductCard.jsx';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showPrescriptionOnly, setShowPrescriptionOnly] = useState(false);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  
  const productsPerPage = 12;

  useEffect(() => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    if (category) {
      setSelectedCategory(category);
    }
    
    if (search) {
      setSearchTerm(search);
    }
  }, [searchParams]);

  useEffect(() => {
    let result = products;

    // Filter by category
    if (selectedCategory !== 'All') {
      result = getProductsByCategory(selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      result = searchProducts(searchTerm);
    }

    // Filter by price range
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filter by prescription requirement
    if (showPrescriptionOnly) {
      result = result.filter(product => product.requiresPrescription);
    }

    // Filter by stock availability
    if (showInStockOnly) {
      result = result.filter(product => product.stock > 0);
    }

    // Sort products
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'popularity':
          return b.stock - a.stock;
        default:
          return 0;
      }
    });

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [selectedCategory, searchTerm, sortBy, priceRange, showPrescriptionOnly, showInStockOnly]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchParams(category === 'All' ? {} : { category });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value) {
      setSearchParams({ search: e.target.value });
    } else {
      setSearchParams({});
    }
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setSearchTerm('');
    setSortBy('name');
    setPriceRange([0, 500]);
    setShowPrescriptionOnly(false);
    setShowInStockOnly(false);
    setSearchParams({});
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };



  return (
    <Container fluid>
      <Row>
        {/* Filters Sidebar */}
        <Col lg={3} className="bg-light p-4">
          <Card>
            <Card.Header>
              <h5 className="mb-0">Filters</h5>
            </Card.Header>
            <Card.Body>
              {/* Search */}
              <Form.Group className="mb-3">
                <Form.Label>Search Products</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Search medicines..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <Button variant="outline-secondary">
                    <i className="fas fa-search"></i>
                  </Button>
                </InputGroup>
              </Form.Group>

              {/* Categories */}
              <Form.Group className="mb-3">
                <Form.Label>Categories</Form.Label>
                <div className="d-flex flex-wrap gap-2">
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'primary' : 'outline-primary'}
                      size="sm"
                      onClick={() => handleCategoryChange(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </Form.Group>

              {/* Price Range */}
              <Form.Group className="mb-3">
                <Form.Label>Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}</Form.Label>
                <Form.Range
                  min={0}
                  max={500}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                />
              </Form.Group>

              {/* Additional Filters */}
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Prescription Required Only"
                  checked={showPrescriptionOnly}
                  onChange={(e) => setShowPrescriptionOnly(e.target.checked)}
                />
                <Form.Check
                  type="checkbox"
                  label="In Stock Only"
                  checked={showInStockOnly}
                  onChange={(e) => setShowInStockOnly(e.target.checked)}
                />
              </Form.Group>

              <Button variant="outline-secondary" onClick={clearFilters} className="w-100">
                Clear All Filters
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Products Grid */}
        <Col lg={9}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Products ({filteredProducts.length})</h2>
            <Form.Select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              style={{ width: '200px' }}
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popularity">Popularity</option>
            </Form.Select>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-search fa-3x text-muted mb-3"></i>
              <h4>No products found</h4>
              <p className="text-muted">Try adjusting your search or filters</p>
              <Button variant="primary" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <Row>
                {currentProducts.map(product => (
                  <Col key={product.id} md={6} lg={4} className="mb-4">
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                  <Pagination>
                    <Pagination.First 
                      onClick={() => handlePageChange(1)}
                      disabled={currentPage === 1}
                    />
                    <Pagination.Prev 
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    />
                    
                    {[...Array(totalPages)].map((_, index) => (
                      <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </Pagination.Item>
                    ))}
                    
                    <Pagination.Next 
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    />
                    <Pagination.Last 
                      onClick={() => handlePageChange(totalPages)}
                      disabled={currentPage === totalPages}
                    />
                  </Pagination>
                </div>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Products;