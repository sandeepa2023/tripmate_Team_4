# Business Registration API Endpoints

## Overview
Simple REST API endpoints for business registration and management. No authentication required.

## Base URL
`http://localhost:8080/api/business`

## Endpoints

### 1. Register a New Business
**POST** `/api/business/register`

**Request Body:**
```json
{
  "name": "Your Business Name",
  "address": "123 Main Street, City, Country",
  "email": "business@example.com",
  "telephone": "+1234567890",
  "website": "https://www.yourbusiness.com", // Optional
  "description": "Description of your business", // Optional
  "category": "restaurant" // Optional
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Business registered successfully",
  "businessId": 1,
  "business": {
    "id": 1,
    "name": "Your Business Name",
    "address": "123 Main Street, City, Country",
    "email": "business@example.com",
    "telephone": "+1234567890",
    "website": "https://www.yourbusiness.com",
    "description": "Description of your business",
    "category": "restaurant",
    "registrationDate": "2025-07-09T10:30:00",
    "active": true
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Business name is required"
}
```

### 2. Get Business Details by ID
**GET** `/api/business/{id}`

**Example:** `GET /api/business/1`

**Response (Success):**
```json
{
  "id": 1,
  "name": "Your Business Name",
  "address": "123 Main Street, City, Country",
  "email": "business@example.com",
  "telephone": "+1234567890",
  "website": "https://www.yourbusiness.com",
  "description": "Description of your business",
  "category": "restaurant",
  "registrationDate": "2025-07-09T10:30:00",
  "active": true
}
```

**Response (Not Found):**
`404 Not Found`

### 3. Update Business Details
**PUT** `/api/business/{id}`

**Example:** `PUT /api/business/1`

**Request Body:**
```json
{
  "name": "Updated Business Name",
  "address": "456 New Street, City, Country",
  "email": "updated@example.com",
  "telephone": "+0987654321",
  "website": "https://www.updated-business.com",
  "description": "Updated description",
  "category": "hotel"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Business updated successfully",
  "business": {
    "id": 1,
    "name": "Updated Business Name",
    "address": "456 New Street, City, Country",
    "email": "updated@example.com",
    "telephone": "+0987654321",
    "website": "https://www.updated-business.com",
    "description": "Updated description",
    "category": "hotel",
    "registrationDate": "2025-07-09T10:30:00",
    "active": true
  }
}
```

### 4. Get All Businesses
**GET** `/api/business/all`

**Response:**
```json
[
  {
    "id": 1,
    "name": "Business One",
    "address": "123 Main Street",
    "email": "business1@example.com",
    "telephone": "+1234567890",
    "category": "restaurant",
    "registrationDate": "2025-07-09T10:30:00",
    "active": true
  },
  {
    "id": 2,
    "name": "Business Two",
    "address": "456 Oak Avenue",
    "email": "business2@example.com",
    "telephone": "+0987654321",
    "category": "hotel",
    "registrationDate": "2025-07-09T11:00:00",
    "active": true
  }
]
```

### 5. Get Businesses by Category
**GET** `/api/business/category/{category}`

**Example:** `GET /api/business/category/restaurant`

**Response:** Array of businesses in that category (same format as above)

### 6. Search Businesses by Name
**GET** `/api/business/search?name={searchTerm}`

**Example:** `GET /api/business/search?name=pizza`

**Response:** Array of businesses matching the search term (same format as above)

### 7. Delete/Deactivate Business
**DELETE** `/api/business/{id}`

**Example:** `DELETE /api/business/1`

**Response (Success):**
```json
{
  "success": true,
  "message": "Business deactivated successfully"
}
```

## Business Categories
Available categories for the `category` field:
- `restaurant`
- `hotel`
- `tour-guide`
- `transportation`
- `attraction`
- `shop`
- `entertainment`
- `other`

## Required Fields
- `name` (string)
- `address` (string)
- `email` (string, must be valid email format)
- `telephone` (string)

## Optional Fields
- `website` (string, URL)
- `description` (string)
- `category` (string, from predefined list)

## Error Handling
All endpoints return appropriate HTTP status codes:
- `200 OK` - Success
- `400 Bad Request` - Validation errors
- `404 Not Found` - Business not found
- `500 Internal Server Error` - Server errors

## Database
Businesses are stored in MySQL database with automatic ID generation and timestamps.
