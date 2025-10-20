// middleware/validateProduct.js - Product validation middleware
const ValidationError = require('../errors/ValidationError');

const validateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  const errors = {};
  
  // For POST requests, all fields are required
  if (req.method === 'POST') {
    if (!name || typeof name !== 'string' || name.trim() === '') {
      errors.name = 'Name is required and must be a non-empty string';
    }
    
    if (!description || typeof description !== 'string') {
      errors.description = 'Description is required and must be a string';
    }
    
    if (price === undefined || typeof price !== 'number' || price < 0) {
      errors.price = 'Price is required and must be a number greater than or equal to 0';
    }
    
    if (!category || typeof category !== 'string') {
      errors.category = 'Category is required and must be a string';
    }
    
    if (inStock === undefined || typeof inStock !== 'boolean') {
      errors.inStock = 'inStock is required and must be a boolean';
    }
  }
  
  // For PUT requests, validate only the fields that are provided
  if (req.method === 'PUT') {
    if (name !== undefined && (typeof name !== 'string' || name.trim() === '')) {
      errors.name = 'Name must be a non-empty string';
    }
    
    if (description !== undefined && typeof description !== 'string') {
      errors.description = 'Description must be a string';
    }
    
    if (price !== undefined && (typeof price !== 'number' || price < 0)) {
      errors.price = 'Price must be a number greater than or equal to 0';
    }
    
    if (category !== undefined && typeof category !== 'string') {
      errors.category = 'Category must be a string';
    }
    
    if (inStock !== undefined && typeof inStock !== 'boolean') {
      errors.inStock = 'inStock must be a boolean';
    }
  }
  
  if (Object.keys(errors).length > 0) {
    throw new ValidationError('Product validation failed', errors);
  }
  
  next();
};

module.exports = validateProduct;