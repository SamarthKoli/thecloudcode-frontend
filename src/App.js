import React, { useState } from 'react';
import SubscriptionPage from './Subscription';
import NewsManagement from './NewsManagement';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('subscription');

  return (
    <div className="App">
      <nav style={{ padding: '20px', background: '#f8f9fa', marginBottom: '20px' }}>
        <button 
          onClick={() => setCurrentPage('subscription')}
          style={{ marginRight: '10px', padding: '10px 20px' }}
        >
          Subscription
        </button>
        <button 
          onClick={() => setCurrentPage('news')}
          style={{ padding: '10px 20px' }}
        >
          News Management
        </button>
      </nav>

      {currentPage === 'subscription' && <SubscriptionPage />}
      {currentPage === 'news' && <NewsManagement />}
    </div>
  );
}

export default App;
