// src/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

// This line will print the backend URL in your browser's console, so you can verify it's correct.
console.log('API calls are being sent to:', API_BASE_URL);

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});
