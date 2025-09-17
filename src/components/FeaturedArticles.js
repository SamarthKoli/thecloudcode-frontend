// src/components/FeaturedArticles.js
import React, { useState, useEffect } from 'react';
import { api } from '../api'; // Ensure this path is correct
import '../FeaturedArticles.css';

const FeaturedArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeaturedArticles = async () => {
            console.log("Attempting to fetch featured articles...");
            try {
                const response = await api.get('/api/news/featured');
                
                // *** This console log is critical for debugging ***
                console.log("API Response Received:", response);

                // Check if the response data and the articles array exist
                if (response.data && response.data.success && Array.isArray(response.data.articles)) {
                    console.log("Successfully fetched articles:", response.data.articles);
                    setArticles(response.data.articles);
                } else {
                    console.warn("API call succeeded, but the response format was unexpected or no articles were found.", response.data);
                    setArticles([]); // Set to empty array to show the "No articles" message
                }
            } catch (error) {
                console.error("CRITICAL: Error fetching featured articles!", error);
                 if (error.response) {
                    console.error("Error Details:", error.response.data);
                } else if (error.request) {
                    console.error("No response received from the server. Is the backend running at " + api.defaults.baseURL + "?");
                }
                setError('Failed to load articles. Check the browser console (F12) for more details.');
            } finally {
                setLoading(false);
            }
        };
        fetchFeaturedArticles();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    if (loading) {
        return (
            <section className="featured-section">
                <div className="container">
                    <h2>Latest Tech Stories</h2>
                    <div className="loading">Loading featured articles...</div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="featured-section">
                <div className="container">
                    <h2>Latest Tech Stories</h2>
                    <div className="error">{error}</div>
                </div>
            </section>
        );
    }

    return (
        <section id="featured" className="featured-section">
            <div className="container">
                <div className="section-header">
                    <h2>Featured Articles</h2>
                    <p className="section-subtitle">Hand-picked tech news for you</p>
                </div>
                <div className="featured-grid">
                    {articles.length > 0 ? (
                        articles.map((article, index) => (
                            <div key={article.id || index} className="featured-card">
                                {article.imageUrl && (
                                    <div className="article-image">
                                        <img src={article.imageUrl} alt={article.title} />
                                    </div>
                                )}
                                <div className="article-content">
                                    <div className="article-meta">
                                        <span className="source">{article.source}</span>
                                        <span className="date">{formatDate(article.publishedDate)}</span>
                                    </div>
                                    <h3 className="article-title">
                                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                                            {article.title}
                                        </a>
                                    </h3>
                                    <p className="article-description">{article.description}</p>
                                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">Read More →</a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No featured articles are available at the moment.</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FeaturedArticles;
