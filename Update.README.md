# Express Products API

A RESTful API for managing products with full CRUD operations, built with Express.js.

## Features

- Full CRUD operations for products
- Authentication via API key
- Request logging
- Input validation
- Error handling
- Filtering, pagination, and search
- Product statistics
- In-memory data store

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env`: `cp .env.example .env`
4. Set your API key in `.env`: `API_KEY=your-secret-key-here`
5. Start the server: `npm start` or `npm run dev` for development

## Environment Variables

- `PORT` - Server port (default: 3000)
- `API_KEY` - API key for authentication (required)

## API Endpoints

### Authentication

All endpoints require the `X-API-KEY` header with a valid API key.

### Get All Products

**GET** `/api/products`

Query parameters:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `category` - Filter by category
- `sort` - Sort by field and direction (e.g., `price_asc`, `price_desc`)
- `q` - Search term

**Example:**
```bash
curl -H "X-API-KEY: your-api-key" "http://localhost:3000/api/products?page=1&limit=5&category=electronics"