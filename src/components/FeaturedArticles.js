import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../FeaturedArticles.css';
const API_URL = process.env.REACT_APP_API_URL;
const FeaturedArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFeaturedArticles();
    }, []);

    const fetchFeaturedArticles = async () => {
        try {
          const response = await axios.get(`${API_URL}/api/news/featured`);

            console.log('Featured articles response:', response.data);
            setArticles(response.data.articles || []);
        } catch (error) {
            console.error('Error fetching featured articles:', error);
            setError('Failed to load articles');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

    // Simple color-based placeholders that always work
    const getPlaceholderStyle = (index) => {
        const colors = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        ];
        return colors[index % colors.length];
    };

    const getSourceIcon = (source) => {
        const icons = {
            'TechCrunch': '🚀',
            'The Verge': '⚡',
            'Default': '📰'
        };
        return icons[source] || icons['Default'];
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
        <section className="featured-section">
            <div className="container">
                <h2>Latest Tech Stories</h2>
              
                
                <div className="featured-grid">
                    {articles.slice(0, 3).map((article, index) => (
                        <article key={article.id || index} className="featured-card">
                            <div className="article-image">
                                {article.imageUrl && article.imageUrl.trim() !== '' ? (
                                    <img 
                                        src={article.imageUrl} 
                                        alt={article.title}
                                        onError={(e) => {
                                            console.log('Image failed to load, hiding image');
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                ) : null}
                                
                                {/* Always show placeholder if no imageUrl */}
                                <div 
                                    className="branded-placeholder"
                                    style={{
                                        background: getPlaceholderStyle(index),
                                        height: '200px',
                                        display: article.imageUrl && article.imageUrl.trim() !== '' ? 'none' : 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        textAlign: 'center'
                                    }}
                                >
                                    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>
                                        {getSourceIcon(article.source)}
                                    </div>
                                    <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                                        {article.source}
                                    </div>
                                    <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                                        Tech News
                                    </div>
                                </div>
                            </div>
                            
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
                                
                                <p className="article-description">
                                    {article.description && article.description.length > 120
                                        ? article.description.substring(0, 120) + '...'
                                        : article.description || 'No description available.'}
                                </p>
                                
                                <a 
                                    href={article.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="read-more"
                                >
                                    Read Full Article →
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedArticles;
