// src/components/NewsManagement.js (COMPLETE FILE)
import React, { useState, useEffect } from 'react';
import { api } from '../api';
import '../NewsManagement.css';

const NewsManagement = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleApiCall = async (apiCall, successMessage) => {
    setLoading(true);
    setMessage('');
    try {
      const response = await apiCall();
      if (response.data.success) {
        setMessage(successMessage);
        fetchArticles(); // Refresh list on success
      } else {
        setMessage(`Error: ${response.data.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const collectNews = () => handleApiCall(() => api.post('/api/news/collect'), 'News collection started!');
  const processArticles = () => handleApiCall(() => api.post('/api/news/process'), 'Article processing started!');
  
  const fetchArticles = async () => {
    const response = await api.get('/api/news/featured');
    if (response.data.success) setArticles(response.data.articles || []);
  };

  useEffect(() => { fetchArticles(); }, []);

  // ... rest of your styling and component return ...
   return (
    <div className="news-management">
      <h2>News Management</h2>
      <div className="actions">
        <button onClick={collectNews} disabled={loading}>{loading ? 'Collecting...' : 'Collect News'}</button>
        <button onClick={processArticles} disabled={loading}>{loading ? 'Processing...' : 'Process Articles'}</button>
      </div>
      {message && <div className="message">{message}</div>}
      {/* ... article list rendering ... */}
    </div>
  );
};

export default NewsManagement;
