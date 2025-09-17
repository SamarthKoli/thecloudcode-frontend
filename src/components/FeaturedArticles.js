// src/components/FeaturedArticles.js (COMPLETE FILE)
import React, { useState, useEffect } from 'react';
import { api } from '../api';
import '../FeaturedArticles.css';

const FeaturedArticles = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const fetchFeaturedArticles = async () => {
      try {
        const response = await api.get('/api/news/featured');
        if (response.data.success) {
          setArticles(response.data.articles || []);
        }
      } catch (error) {
        console.error('Error fetching featured articles:', error);
      }
    };
    fetchFeaturedArticles();
  }, []);

  // ... rest of your styling and component return ...
  return (
    <section className="featured-articles">
      <div className="container">
        <h2>Featured Tech News</h2>
        <div className="articles-grid">
          {articles.length > 0 ? articles.map((article, index) => (
            <article key={index} className="article-card">
              <h3 className="article-title"><a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a></h3>
              <p className="article-description">{article.description}</p>
              <div className="article-meta">
                <span className="source">{article.source}</span>
                <span className="date">{new Date(article.publishedDate).toLocaleDateString()}</span>
              </div>
            </article>
          )) : <p>No articles available.</p>}
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;
