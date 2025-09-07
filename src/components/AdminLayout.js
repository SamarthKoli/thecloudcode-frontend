import React from 'react';
import { useAuth } from '../context/AuthContext';
import NewsManagement from './NewsManagement'; // Your existing component
import '../AdminLayout.css';
import NewsletterAdminPanel from './NewsletterAdminPanel';
const AdminLayout = () => {
    const { logout, user } = useAuth();

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            logout();
        }
    };

    return (
        <div className="admin-layout">
            <header className="admin-header">
                <div className="header-content">
                    <h1>📧 Newsletter Admin</h1>
                    <div className="admin-info">

                        <span>Welcome, {user?.username}</span>
                        <button onClick={handleLogout} className="logout-btn">
                            Logout
                        </button>

                    </div>
                     <NewsletterAdminPanel></NewsletterAdminPanel>
                </div>
            </header>
            <main className="admin-main">
                <NewsManagement />
               
            </main>
        </div>
    );
};

export default AdminLayout;
