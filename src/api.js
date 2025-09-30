// src/api.js
import axios from 'axios';

// This will use the Render backend URL in production
const API_BASE_URL ='https://thecloudcode-backend.onrender.com';


export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // Increased timeout for production
});
