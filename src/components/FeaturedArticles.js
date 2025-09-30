import React, { useState, useEffect } from 'react';
import { api } from '../api';
import '../FeaturedArticles.css';
import { MagnifyingGlass } from 'react-loader-spinner';

const CACHE_KEY = "latestArticlesCache";

const FeaturedArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load articles from cache for instant display
    useEffect(() => {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) setArticles(JSON.parse(cached));
    }, []);

    // Always try fetching latest articles from backend and update cache
    useEffect(() => {
        const fetchFeaturedArticles = async () => {
            try {
                const response = await api.get('/api/news/cached-latest');
                if (response.data && response.data.articles) {
                    setArticles(response.data.articles);
                    localStorage.setItem(CACHE_KEY, JSON.stringify(response.data.articles));
                } else {
                    setArticles([]);
                }
            } catch (error) {
                // Removed error state & message display per request
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

    if (loading || articles.length === 0) {
        return (
            <section className="featured-section">
                <div className="container">
                    <h2>Latest Tech Stories</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
                        <MagnifyingGlass
                            visible={true}
                            height="50"
                            width="50"
                            glassColor="#FF6B35"
                            color="#764BA2"
                        />
                    </div>
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
                    {articles.map((article, index) => (
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
                                <p className="article-description">{article.description || article.summary}</p>
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">Read More →</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedArticles;
