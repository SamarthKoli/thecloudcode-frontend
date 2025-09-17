// src/pages/UnsubscribePage.js (COMPLETE FILE)
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

const UnsubscribePage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleUnsubscribe = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    try {
      const response = await api.post('/api/subscribers/unsubscribe', { email });
      if (response.data.success) {
        setMessage('You have been successfully unsubscribed.');
        setIsSuccess(true);
        setEmail('');
      } else {
        setMessage(response.data.message || 'Unsubscribe failed');
        setIsSuccess(false);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Something went wrong. Please try again.';
      setMessage(errorMsg);
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... rest of your styling and component return ...
  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: '#FF6B35', marginBottom: '1rem' }}>Unsubscribe from Newsletter</h2>
      <form onSubmit={handleUnsubscribe}>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            style={{ width: '100%', padding: '0.75rem', border: '2px solid #ddd', borderRadius: '5px', fontSize: '1rem' }}
            required
          />
        </div>
        <button type="submit" disabled={isSubmitting} style={{ backgroundColor: '#FF6B35', color: 'white', padding: '0.75rem 1.5rem', border: 'none', borderRadius: '5px', fontSize: '1rem', cursor: 'pointer' }}>
          {isSubmitting ? 'Processing...' : 'Unsubscribe'}
        </button>
      </form>
      {message && (
        <div style={{ padding: '0.75rem', marginTop: '1rem', borderRadius: '5px', backgroundColor: isSuccess ? '#d4edda' : '#f8d7da', color: isSuccess ? '#155724' : '#721c24' }}>
          {message}
        </div>
      )}
      <div style={{ marginTop: '2rem' }}><Link to="/" style={{ color: '#FF6B35', textDecoration: 'none' }}>← Back to Home</Link></div>
    </div>
  );
};

export default UnsubscribePage;
