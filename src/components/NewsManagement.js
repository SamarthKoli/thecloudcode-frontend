import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../NewsManagement.css';
const API_URL = process.env.REACT_APP_API_URL;

const NewsManagement = () => {
    const [articles, setArticles] = useState([]);
    const [processedArticles, setProcessedArticles] = useState([]);
    const [newsletterPreview, setNewsletterPreview] = useState('');
    const [loading, setLoading] = useState(false);
    const [collecting, setCollecting] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [message, setMessage] = useState('');
    const [subscriberCount, setSubscriberCount] = useState(0);
    const [activeTab, setActiveTab] = useState('articles'); // articles, processed, newsletter

    useEffect(() => {
        fetchRecentArticles();
        fetchSubscriberCount();
    }, []);

    const fetchSubscriberCount = async () => {
        try {
            const response = await axios.get('${API_URL}/api/subscribers/count');
            setSubscriberCount(response.data.count);
        } catch (error) {
            console.error('Error fetching subscriber count:', error);
        }
    };

    const fetchRecentArticles = async () => {
        setLoading(true);
        try {
            const response = await axios.get('${API_URL}/api/news/recent');
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
            const response = await axios.post('${API_URL}/api/news/collect');
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

    const processWithAI = async () => {
        setProcessing(true);
        setMessage('');
        
        try {
            const response = await axios.post('${API_URL}/api/news/process');
            setProcessedArticles(response.data.topArticles || []);
            setMessage(response.data.message);
            setActiveTab('processed'); // Switch to processed tab
            
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error processing articles with AI');
        } finally {
            setProcessing(false);
        }
    };

    const generateNewsletter = async () => {
        setProcessing(true);
        setMessage('');
        
        try {
            const response = await axios.post('${API_URL}/api/news/generate-newsletter');
            setNewsletterPreview(response.data.newsletter);
            setProcessedArticles(response.data.topArticles || []);
            setMessage(response.data.message);
            setActiveTab('newsletter'); // Switch to newsletter tab
            
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error generating newsletter');
        } finally {
            setProcessing(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    const getCategoryIcon = (category) => {
        const icons = {
            'AI/ML': '🤖',
            'Startups/Funding': '🚀',
            'Consumer Tech': '📱',
            'Enterprise/Business': '💼',
            'Security/Privacy': '🔒',
            'Developer Tools': '⚒️',
            'Hardware': '💻'
        };
        return icons[category] || '📰';
    };

    const getScoreColor = (score) => {
        if (score >= 8) return '#4CAF50'; // Green
        if (score >= 6) return '#FF9800'; // Orange
        return '#757575'; // Gray
    };

    return (
        <div className="news-management">
            <div className="header">
                <h2>🤖 AI-Powered Newsletter Dashboard</h2>
                <div className="actions">
                    <button 
                        onClick={collectNews} 
                        disabled={collecting || processing}
                        className="collect-btn"
                    >
                        {collecting ? 'Collecting...' : 'Collect Latest News'}
                    </button>
                    <button 
                        onClick={processWithAI} 
                        disabled={processing || collecting}
                        className="ai-btn"
                    >
                        {processing ? 'Processing with AI...' : '🧠 Process with AI'}
                    </button>
                    <button 
                        onClick={generateNewsletter} 
                        disabled={processing || collecting}
                        className="generate-btn"
                    >
                        {processing ? 'Generating...' : '📧 Generate Newsletter'}
                    </button>

              
                </div>
            </div>

            {message && (
                <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
                    {message}
                </div>
            )}

            <div className="stats-bar">
                <div className="stat">
                    <span className="stat-label">Active Subscribers:</span>
                    <span className="stat-value">{subscriberCount}</span>
                </div>
                <div className="stat">
                    <span className="stat-label">Raw Articles:</span>
                    <span className="stat-value">{articles.length}</span>
                </div>
                <div className="stat">
                    <span className="stat-label">AI Processed:</span>
                    <span className="stat-value">{processedArticles.length}</span>
                </div>
            </div>

            <div className="tabs">
                <button 
                    className={`tab ${activeTab === 'articles' ? 'active' : ''}`}
                    onClick={() => setActiveTab('articles')}
                >
                    📰 Raw Articles ({articles.length})
                </button>
                <button 
                    className={`tab ${activeTab === 'processed' ? 'active' : ''}`}
                    onClick={() => setActiveTab('processed')}
                >
                    🧠 AI Processed ({processedArticles.length})
                </button>
                <button 
                    className={`tab ${activeTab === 'newsletter' ? 'active' : ''}`}
                    onClick={() => setActiveTab('newsletter')}
                >
                    📧 Newsletter Preview
                </button>
            </div>

            <div className="content">
                {activeTab === 'articles' && (
                    <div className="articles-section">
                        <h3>Raw Articles from RSS Feeds</h3>
                        {loading ? (
                            <p>Loading articles...</p>
                        ) : articles.length === 0 ? (
                            <p>No articles found. Click "Collect Latest News" to fetch articles.</p>
                        ) : (
                            <div className="articles-grid">
                                {articles.map((article, index) => (
                                    <div key={index} className="article-card raw">
                                        <div className="article-header">
                                            <h4>{article.title}</h4>
                                            <span className="source">{article.source}</span>
                                        </div>
                                        <p className="description">{article.description?.substring(0, 150)}...</p>
                                        <div className="article-footer">
                                            <span className="date">{formatDate(article.publishedDate)}</span>
                                            <a href={article.url} target="_blank" rel="noopener noreferrer">
                                                Read Full Article →
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'processed' && (
                    <div className="processed-section">
                        <h3>AI Processed & Curated Articles</h3>
                        {processedArticles.length === 0 ? (
                            <p>No processed articles yet. Click "Process with AI" to analyze articles.</p>
                        ) : (
                            <div className="processed-grid">
                                {processedArticles.map((article, index) => (
                                    <div key={index} className="processed-card">
                                        <div className="processed-header">
                                            <div className="title-section">
                                                <span className="category-icon">
                                                    {getCategoryIcon(article.category)}
                                                </span>
                                                <h4>{article.originalArticle.title}</h4>
                                            </div>
                                            <div className="metadata">
                                                <span 
                                                    className="relevance-score"
                                                    style={{ color: getScoreColor(article.relevanceScore) }}
                                                >
                                                    {article.relevanceScore}/10
                                                </span>
                                                <span className="category">{article.category}</span>
                                            </div>
                                        </div>
                                        <div className="ai-summary">
                                            <strong>AI Summary:</strong>
                                            <p>{article.summary}</p>
                                        </div>
                                        <div className="processed-footer">
                                            <span className="source">{article.originalArticle.source}</span>
                                            <a href={article.originalArticle.url} target="_blank" rel="noopener noreferrer">
                                                Read Original →
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'newsletter' && (
                    <div className="newsletter-section">
                        <h3>Generated Newsletter Preview</h3>
                        {newsletterPreview ? (
                            <div className="newsletter-preview">
                                <div className="preview-header">
                                    <h4>📧 Newsletter Preview</h4>
                                    <button className="copy-btn" onClick={() => navigator.clipboard.writeText(newsletterPreview)}>
                                        📋 Copy Content
                                    </button>
                                </div>
                                <pre className="newsletter-content">{newsletterPreview}</pre>
                            </div>
                        ) : (
                            <p>No newsletter generated yet. Click "Generate Newsletter" to create one.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsManagement;
