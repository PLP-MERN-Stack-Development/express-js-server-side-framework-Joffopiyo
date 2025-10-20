// data/productsStore.js - In-memory data store for products
const { v4: uuidv4 } = require('uuid');

let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Helper functions
const getAllProducts = () => [...products];

const getProductById = (id) => products.find(product => product.id === id);

const createProduct = (productData) => {
  const newProduct = {
    id: uuidv4(),
    ...productData
  };
  products.push(newProduct);
  return newProduct;
};

const updateProduct = (id, updateData) => {
  const productIndex = products.findIndex(product => product.id === id);
  if (productIndex === -1) return null;
  
  products[productIndex] = { ...products[productIndex], ...updateData };
  return products[productIndex];
};

const deleteProduct = (id) => {
  const productIndex = products.findIndex(product => product.id === id);
  if (productIndex === -1) return false;
  
  products.splice(productIndex, 1);
  return true;
};

const searchProducts = (query) => {
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm)
  );
};

const getProductStats = () => {
  const totalProducts = products.length;
  const totalInStock = products.filter(product => product.inStock).length;
  
  const countByCategory = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});
  
  return { totalProducts, totalInStock, countByCategory };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductStats
};