// routes/products.js - Product routes
const express = require('express');
const router = express.Router();

// Import controllers and middleware
const productsController = require('../controllers/productsController');
const auth = require('../middleware/auth');
const validateProduct = require('../middleware/validateProduct');

// Apply authentication to all routes
router.use(auth);

// GET /api/products - Get all products with filtering, pagination, sorting
router.get('/', productsController.getAllProducts);

// GET /api/products/search - Search products
router.get('/search', productsController.searchProducts);

// GET /api/products/stats - Get product statistics
router.get('/stats', productsController.getStats);

// GET /api/products/:id - Get a specific product
router.get('/:id', productsController.getProductById);

// POST /api/products - Create a new product
router.post('/', validateProduct, productsController.createProduct);

// PUT /api/products/:id - Update a product
router.put('/:id', validateProduct, productsController.updateProduct);

// DELETE /api/products/:id - Delete a product
router.delete('/:id', productsController.deleteProduct);

module.exports = router;