import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../LoginPage.css';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        setTimeout(() => {
            const success = login(credentials);
            if (!success) {
                setError('Invalid credentials.Fuck off if you are not admin');
            }
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-card">
                    <h2>🔐 Admin Login</h2>
                    <p>Access the newsletter management dashboard</p>
                    
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                value={credentials.username}
                                onChange={(e) => setCredentials({
                                    ...credentials, 
                                    username: e.target.value
                                })}
                                placeholder="Enter username"
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                value={credentials.password}
                                onChange={(e) => setCredentials({
                                    ...credentials, 
                                    password: e.target.value
                                })}
                                placeholder="Enter password"
                                required
                            />
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <button type="submit" disabled={loading} className="login-button">
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>

                   
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
