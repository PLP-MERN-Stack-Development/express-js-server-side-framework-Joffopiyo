// controllers/productsController.js - Product controller functions
const asyncHandler = require('../utils/asyncHandler');
const { 
  getAllProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  searchProducts, 
  getProductStats 
} = require('../data/productsStore');
const NotFoundError = require('../errors/NotFoundError');

// GET /api/products - Get all products with filtering, pagination, sorting
const getAllProductsHandler = asyncHandler(async (req, res) => {
  let products = getAllProducts();
  
  // Filter by category
  if (req.query.category) {
    products = products.filter(product => 
      product.category.toLowerCase() === req.query.category.toLowerCase()
    );
  }
  
  // Search functionality (if q parameter is provided)
  if (req.query.q) {
    const searchTerm = req.query.q.toLowerCase();
    products = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm)
    );
  }
  
  // Sorting
  if (req.query.sort) {
    const [field, order] = req.query.sort.split('_');
    products.sort((a, b) => {
      if (order === 'asc') {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });
  }
  
  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  const paginatedProducts = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / limit);
  
  res.json({
    meta: {
      total: products.length,
      page,
      limit,
      totalPages
    },
    data: paginatedProducts
  });
});

// GET /api/products/search - Search products
const searchProductsHandler = asyncHandler(async (req, res) => {
  if (!req.query.q) {
    return res.status(400).json({
      error: 'ValidationError',
      message: 'Search query parameter "q" is required'
    });
  }
  
  const products = searchProducts(req.query.q);
  
  // Apply pagination to search results
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  const paginatedProducts = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / limit);
  
  res.json({
    meta: {
      total: products.length,
      page,
      limit,
      totalPages
    },
    data: paginatedProducts
  });
});

// GET /api/products/stats - Get product statistics
const getStatsHandler = asyncHandler(async (req, res) => {
  const stats = getProductStats();
  res.json(stats);
});

// GET /api/products/:id - Get a specific product
const getProductByIdHandler = asyncHandler(async (req, res) => {
  const product = getProductById(req.params.id);
  if (!product) {
    throw new NotFoundError(`Product with id ${req.params.id} not found`);
  }
  res.json(product);
});

// POST /api/products - Create a new product
const createProductHandler = asyncHandler(async (req, res) => {
  const newProduct = createProduct(req.body);
  res.status(201).json(newProduct);
});

// PUT /api/products/:id - Update a product
const updateProductHandler = asyncHandler(async (req, res) => {
  const updatedProduct = updateProduct(req.params.id, req.body);
  if (!updatedProduct) {
    throw new NotFoundError(`Product with id ${req.params.id} not found`);
  }
  res.json(updatedProduct);
});

// DELETE /api/products/:id - Delete a product
const deleteProductHandler = asyncHandler(async (req, res) => {
  const deleted = deleteProduct(req.params.id);
  if (!deleted) {
    throw new NotFoundError(`Product with id ${req.params.id} not found`);
  }
  res.status(204).send();
});

module.exports = {
  getAllProducts: getAllProductsHandler,
  getProductById: getProductByIdHandler,
  createProduct: createProductHandler,
  updateProduct: updateProductHandler,
  deleteProduct: deleteProductHandler,
  searchProducts: searchProductsHandler,
  getStats: getStatsHandler
};