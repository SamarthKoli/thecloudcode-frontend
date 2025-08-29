import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewsManagement.css';

const NewsManagement = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [collecting, setCollecting] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchRecentArticles();
    }, []);

    const fetchRecentArticles = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/news/recent');
            setArticles(response.data.articles || []);
        } catch (error) {
            console.error('Error fetching articles:', error);
            setMessage('Error loading articles');
        } finally {
            setLoading(false);
        }
    };

    const collectNews = async () => {
        setCollecting(true);
        setMessage('');
        
        try {
            const response = await axios.post('/api/news/collect');
            setMessage(response.data.message);
            
            // Refresh articles after collection
            setTimeout(() => {
                fetchRecentArticles();
            }, 1000);
            
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error collecting articles');
        } finally {
            setCollecting(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    return (
        <div className="news-management">
            <div className="header">
                <h2>📰 News Collection Dashboard</h2>
                <button 
                    onClick={collectNews} 
                    disabled={collecting}
                    className="collect-btn"
                >
                    {collecting ? 'Collecting...' : 'Collect Latest News'}
                </button>
            </div>

            {message && (
                <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
                    {message}
                </div>
            )}

            <div className="stats">
                <p>Recent Articles: {articles.length}</p>
                <button onClick={fetchRecentArticles} disabled={loading}>
                    {loading ? 'Loading...' : 'Refresh'}
                </button>
            </div>

            <div className="articles-list">
                {loading ? (
                    <p>Loading articles...</p>
                ) : articles.length === 0 ? (
                    <p>No articles found. Click "Collect Latest News" to fetch articles.</p>
                ) : (
                    articles.map((article, index) => (
                        <div key={index} className="article-card">
                            <div className="article-header">
                                <h3>{article.title}</h3>
                                <span className="source">{article.source}</span>
                            </div>
                            <p className="description">{article.description}</p>
                            <div className="article-footer">
                                <span className="date">{formatDate(article.publishedDate)}</span>
                                <a href={article.url} target="_blank" rel="noopener noreferrer">
                                    Read Full Article →
                                </a>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default NewsManagement;
