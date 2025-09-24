// src/api.js
import axios from 'axios';

// This will use the Render backend URL in production
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

console.log('API calls are being sent to:', API_BASE_URL);

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // Increased timeout for production
});
