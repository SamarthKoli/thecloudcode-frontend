import React, { useState } from 'react';
import { api } from '../api';
import FeaturedArticles from '../components/FeaturedArticles';
import { EnvelopeIcon, CheckIcon, SparklesIcon } from '@heroicons/react/24/outline';
import '../HomePage.css';
import herologo from '../herologo-removebg-preview.png';

const HomePage = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            const response = await api.post('/api/subscribers/subscribe', { email });
            if (response.data.success) {
                setIsSuccess(true);
                setMessage('Successfully subscribed! Check your email for confirmation.');
                setEmail('');
            } else {
                setIsSuccess(false);
                setMessage(response.data.message || 'Something went wrong!');
            }
        } catch (error) {
            setIsSuccess(false);
            setMessage(error.response?.data?.message || 'Failed to connect to the server. Please ensure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="homepage">
            <nav className="nav-header">
                <div className="nav-container">
                    <div className="nav-brand">
                        <div className="logo-container">
                            <span className="brand-name">TheCloudCode</span>
                        </div>
                    </div>
                    <div className="nav-links">
                        <a href="#about">About</a>
                        <a href="#featured">Articles</a>
                        <a href="#subscribe">Subscribe</a>
                    </div>
                </div>
            </nav>

            <section className="hero">
                <div className="hero-container">
                    <div className="hero-content-wrapper">
                        <div className="hero-content">
                            <div className="hero-badge">
                                <SparklesIcon className="badge-icon" />
                                <span>AI-Powered Tech Insights</span>
                            </div>
                            <h1 className="hero-title">
                                <span className="title-brand">TheCloudCode</span>
                                <span className="title-main">Daily Tech Newsletter</span>
                            </h1>
                            <p className="hero-subtitle">
                                Learn from what engineers at <strong>Google</strong>, <strong>Microsoft</strong>, and <strong>Amazon</strong> are reading.
                                Get AI-curated tech insights delivered to your inbox every morning.
                            </p>
                            <form id="subscribe" onSubmit={handleSubmit} className="hero-subscribe-form">
                                <div className="input-group">
                                    <EnvelopeIcon className="input-icon" />
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
                                        {loading ? 'Subscribing...' : 'Subscribe'}
                                    </button>
                                </div>
                            </form>

                            {message && (
                                <div className={`message ${isSuccess ? 'success' : 'error'}`}>
                                    {isSuccess && <CheckIcon className="message-icon" />}
                                    {message}
                                </div>
                            )}

                            <div className="hero-stats">
                                <div className="stat-item">
                                    <span className="stat-number">30+</span>
                                    <span className="stat-label">News And Articles</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">Daily</span>
                                    <span className="stat-label">Updates</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">AI-Powered</span>
                                    <span className="stat-label">Curation</span>
                                </div>
                            </div>
                        </div>

                        <div className="hero-mascot">
                            <div className="mascot-container">
                                <img
                                    src={herologo}
                                    alt="TheCloudCode Mascot"
                                    className="mascot-image"
                                />
                                <div className="mascot-float-elements">
                                    <div className="float-element float-1">💻</div>
                                    <div className="float-element float-2">☁️</div>
                                    <div className="float-element float-3">⚡</div>
                                    <div className="float-element float-4">🚀</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <FeaturedArticles />

            <section id="about" className="features-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Why Choose TheCloudCode?</h2>
                        <p>Because we know what actually matters to you</p>
                    </div>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🤖</div>
                            <h3>AI-Powered Curation</h3>
                            <p>Advanced algorithms select and summarize the most important tech developments from trusted sources.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">⚡</div>
                            <h3>Daily & Concise</h3>
                            <p>Get your complete tech update in under 5 minutes every morning. No spam, no fluff, just value.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🎯</div>
                            <h3>Developer-Focused</h3>
                            <p>Covering cloud, AI/ML, system design, and emerging technologies that matter to your career.</p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-brand">
                        <div className="logo-container">
                            <span className="brand-name">TheCloudCode</span>
                        </div>
                        <p>Empowering developers with daily tech insights</p>
                    </div>
                    <div className="footer-links">
                        <div className="link-group">
                            <h4>Product</h4>
                            <a href="#subscribe">Subscribe</a>
                            <a href="#archive">Archive</a>
                            <a href="#about">About</a>
                        </div>
                        <div className="link-group">
                            <h4>Support</h4>
                            <a href="/unsubscribe">Unsubscribe</a>
                            <a href="/privacy">Privacy</a>
                            <a href="#contact">Contact</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2025 TheCloudCode. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
