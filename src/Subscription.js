import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Subscription.css';

const SubscriptionPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [subscriberCount, setSubscriberCount] = useState(0);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        fetchSubscriberCount();
    }, []);

    const fetchSubscriberCount = async () => {
        try {
            const response = await axios.get('/api/subscribers/count');
            setSubscriberCount(response.data.count);
        } catch (error) {
            console.error('Error fetching subscriber count:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await axios.post('/api/subscribers/subscribe', { email });
            setIsSuccess(true);
            setMessage(response.data.message);
            setEmail('');
            fetchSubscriberCount(); // Refresh count after successful subscription
        } catch (error) {
            setIsSuccess(false);
            setMessage(error.response?.data?.message || 'Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="subscription-container">
            <div className="subscription-card">
                <div className="header">
                    <h1>🚀 The CloudCode</h1>
                    <p>Get curated tech news and insights delivered to your inbox every morning</p>
                </div>

                <div className="features">
                    <div className="feature">
                        <span className="icon">📰</span>
                        <span>Latest Tech News</span>
                    </div>
                    <div className="feature">
                        <span className="icon">📖</span>
                        <span>In-depth Articles</span>
                    </div>
                    <div className="feature">
                        <span className="icon">⚡</span>
                        <span>Daily Delivery</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="subscription-form">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        disabled={loading}
                        className="email-input"
                    />
                    <button 
                        type="submit" 
                        disabled={loading || !email.trim()}
                        className="subscribe-btn"
                    >
                        {loading ? 'Subscribing...' : 'Subscribe Now'}
                    </button>
                </form>

                {message && (
                    <div className={`message ${isSuccess ? 'success' : 'error'}`}>
                        {message}
                    </div>
                )}

                <div className="stats">
                    <p>Join {subscriberCount} others getting daily tech updates</p>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionPage;
