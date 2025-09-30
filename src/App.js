import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import UnsubscribePage from './pages/UnsubscribePage';
import AdminLayout from './components/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import Privacy from './pages/privacy';
import TauntPage from './components/TauntPage';
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/unsubscribe" element={<UnsubscribePage />} />
            <Route path="/taunt" element={<TauntPage />} />
            <Route path='/privacy' element={<Privacy />}/>
            {/* Admin Routes (Protected) */}
            <Route path="/admin/*" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
