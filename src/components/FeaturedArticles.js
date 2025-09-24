import React, { useState, useEffect } from 'react';
import { api } from '../api';
import '../FeaturedArticles.css';

const FeaturedArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeaturedArticles = async () => {
            try {
                const response = await api.get('/api/news/featured');
                // The backend sends a payload like { success: true, articles: [...] }
                // So we need to access the 'articles' property from the response data.
                if (response.data && response.data.articles) {
                    setArticles(response.data.articles);
                } else {
                    // Handle cases where the API call is successful but there are no articles
                    setArticles([]); 
                }
            } catch (error) {
                console.error('Error fetching featured articles:', error);
                setError('Failed to load articles. Please ensure the backend is running and accessible.');
            } finally {
                setLoading(false);
            }
        };
        fetchFeaturedArticles();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
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
                        <p>No featured articles available at the moment.</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FeaturedArticles;
