// src/pages/HomePage.js (COMPLETE FILE)
import React, { useState } from 'react';
import { api } from '../api';
import FeaturedArticles from '../components/FeaturedArticles';
import { EnvelopeIcon, CheckIcon, SparklesIcon } from '@heroicons/react/24/outline';
import '../HomePage.css';
import herologo from '../herologo-removebg-preview.png';

const HomePage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setMessage('Please enter a valid email address');
      setIsSuccess(false);
      return;
    }
    setIsSubmitting(true);
    setMessage('');
    try {
      const response = await api.post('/api/subscribers/subscribe', { email });
      if (response.data.success) {
        setMessage('Successfully subscribed! Check your email for confirmation.');
        setIsSuccess(true);
        setEmail('');
      } else {
        setMessage(response.data.message || 'Subscription failed');
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

  return (
    <div className="homepage">
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-logo">
            <img src={herologo} alt="TheCloudCode" className="logo-image" />
            <h1 className="hero-title">TheCloudCode</h1>
          </div>
          <h2 className="hero-subtitle">Your Daily Dose of Tech Innovation</h2>
          <p className="hero-description">
            Stay ahead with curated tech news, cloud computing insights, and developer trends.
            Get the latest updates delivered to your inbox every day.
          </p>
          <div className="subscription-section">
            <form onSubmit={handleSubmit} className="subscription-form">
              <div className="input-group">
                <EnvelopeIcon className="input-icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="email-input"
                  required
                />
                <button type="submit" disabled={isSubmitting} className="subscribe-button">
                  {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
                </button>
              </div>
            </form>
            {message && (
              <div className={`message ${isSuccess ? 'success' : 'error'}`}>
                {isSuccess && <CheckIcon className="message-icon" />}
                {message}
              </div>
            )}
          </div>
          <div className="features">
            <div className="feature"><SparklesIcon className="feature-icon" /><span>AI-Curated Content</span></div>
            <div className="feature"><CheckIcon className="feature-icon" /><span>Daily Updates</span></div>
            <div className="feature"><EnvelopeIcon className="feature-icon" /><span>No Spam</span></div>
          </div>
        </div>
      </section>
      <FeaturedArticles />
    </div>
  );
};

export default HomePage;
