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
        <center>
          <span className="brand-name">TheCloudCode</span>
        </center>
      </div>
      <p>See you!!! in your inbox</p>
    </div>
    <div className="footer-links">
      <div className="link-group">
        <h4>Product</h4>
        <a href="#subscribe">Subscribe</a>
        <a href="#about">About</a>
      </div>
      <div className="link-group">
        <h4>Support</h4>
        <a href="/unsubscribe">Unsubscribe</a>
        <a href="/privacy">Privacy</a>
      </div>
    </div>
  </div>

  <div style={{ textAlign: 'center', margin: '1rem 0' }}>
    <h2>Social Media</h2>
    <a
      href="https://instagram.com/thecloudcode"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
      style={{ margin: '0 10px', color:'black'}}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="45"
        height="35"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M7.75 2h8.5C18.55 2 21 4.46 21 7.75v8.5c0 3.29-2.45 5.75-4.75 5.75h-8.5C5.45 22 3 19.54 3 16.25v-8.5C3 4.46 5.45 2 7.75 2zm4.25 4.09a3.16 3.16 0 1 0 0 6.31 3.16 3.16 0 0 0 0-6.31zm4.88-.4a.74.74 0 1 1 0 1.49.74.74 0 0 1 0-1.49zM12 8a1.69 1.69 0 1 1-1.69 1.69A1.7 1.7 0 0 1 12 8z" />
      </svg>
    </a>
    <a
      href="https://x.com/KoliSamarthh?t=pGcyXGrU6vKSP_tPolTSAg&s=09"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Twitter"
      style={{ margin: '0 10px', color:'black' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="45"
        height="35"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
      </svg>
    </a>
    <a
      href="https://youtube.com/@thecloudcode?si=eEVK0iTOom57A2Cx"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="YouTube"
      style={{ margin: '0 10px', color:'black' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="45"
        height="35"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
      </svg>
    </a>
  </div>

  <div className="footer-bottom">
    <p>© {new Date().getFullYear()} TheCloudCode. All rights reserved.</p>
  </div>
</footer>

        </div>
    );
};

export default HomePage;
