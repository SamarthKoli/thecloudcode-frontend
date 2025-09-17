import React, { useState } from 'react';
import { api } from '../api';
const API_URL = process.env.REACT_APP_API_URL;
const NewsletterAdminPanel = () => {
  const [templateType, setTemplateType] = useState('daily');
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');

  const sendNewsletter = async () => {
    setSending(true);
    setMessage('');
    try {
      const url =
        templateType === 'daily'
          ? '/api/news/send-daily'
          : '/api/news/send-weekly';
      const response = await api.post(url);
      if (response.data.success) {
        setMessage('Newsletter sent successfully');
      } else {
        setMessage('Failed to send newsletter');
      }
    } catch (error) {
      setMessage('Error sending newsletter');
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h2>TheCloudCode Newsletter Admin Panel</h2>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Select Template:
          <select
            value={templateType}
            onChange={(e) => setTemplateType(e.target.value)}
            style={{ marginLeft: '10px' }}
          >
            <option value="daily">Daily Digest</option>
            <option value="weekly">Weekly Roundup</option>
          </select>
        </label>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={sendNewsletter} disabled={sending}>
          {sending ? 'Sending...' : 'Send Newsletter'}
        </button>
      </div>
      {message && (
        <div style={{ marginBottom: '1rem', fontWeight: 'bold', color: message.includes('success') ? 'green' : 'red' }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default NewsletterAdminPanel;
