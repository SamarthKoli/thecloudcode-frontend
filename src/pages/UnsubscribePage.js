import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UnsubscribePage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUnsubscribe = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            // You'll need to implement this endpoint in your backend
            await axios.post('/api/subscribers/unsubscribe', { email });
            setMessage('Successfully unsubscribed. We\'re sorry to see you go!');
        } catch (error) {
            setMessage('Error processing unsubscribe request. Please contact support.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '100px auto', padding: '40px', textAlign: 'center' }}>
            <h1>📧 Unsubscribe</h1>
            <p>We're sorry to see you go. Enter your email below to unsubscribe from our newsletter.</p>
            
            <form onSubmit={handleUnsubscribe} style={{ marginBottom: '30px' }}>
                <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ width: '100%', padding: '12px', marginBottom: '15px', fontSize: '16px' }}
                />
                <button type="submit" disabled={loading} style={{ padding: '12px 30px', fontSize: '16px' }}>
                    {loading ? 'Processing...' : 'Unsubscribe'}
                </button>
            </form>

            {message && (
                <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px', marginBottom: '20px' }}>
                    {message}
                </div>
            )}

            <Link to="/" style={{ color: '#007bff', textDecoration: 'none' }}>
                ← Back to Home
            </Link>
        </div>
    );
};

export default UnsubscribePage;
