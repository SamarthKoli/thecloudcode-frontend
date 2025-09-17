// src/api.js
import axios from 'axios';

// This will read the Vercel environment variable in production,
// and default to localhost:8080 for local development.
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

console.log('API calls will be sent to:', API_BASE_URL);

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 1000, // 10 second timeout
});
