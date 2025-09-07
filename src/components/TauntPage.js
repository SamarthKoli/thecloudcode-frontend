import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../TauntPage.css';

const TauntPage = () => {
    const [tauntData, setTauntData] = useState(null);
    const [countdown, setCountdown] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch taunt data when component mounts
        fetch('/api/taunt')
            .then(response => response.json())
            .then(data => setTauntData(data))
            .catch(error => console.error('Error fetching taunt:', error));

        // Countdown timer
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate('/'); // Redirect to home
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    const handleGoHome = () => {
        navigate('/');
    };

    if (!tauntData) {
        return (
            <div className="taunt-page loading">
                <div className="loading-spinner">🕵️‍♂️</div>
                <p>Processing your unauthorized request...</p>
            </div>
        );
    }

    return (
        <div className="taunt-page">
            <div className="taunt-container">
                {/* Header */}
                <div className="taunt-header">
                    <div className="warning-icon">⚠️</div>
                    <h1 className="taunt-title">ACCESS DENIED</h1>
                    <div className="status-code">HTTP {tauntData.statusCode}</div>
                </div>

                {/* Main Message */}
                <div className="taunt-content">
                    <div className="main-message">
                        <h2>{tauntData.message}</h2>
                    </div>

                    <div className="suggestion">
                        <p>💡 {tauntData.suggestion}</p>
                    </div>

                    {/* Fun Stats */}
                    <div className="incident-info">
                        <div className="info-grid">
                            <div className="info-item">
                                <span className="info-label">Your IP:</span>
                                <span className="info-value">{tauntData.yourIp}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Incident ID:</span>
                                <span className="info-value">{tauntData.incident}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Time:</span>
                                <span className="info-value">{tauntData.timestamp}</span>
                            </div>
                        </div>
                    </div>

                    {/* Fake Terminal */}
                    <div className="fake-terminal">
                        <div className="terminal-header">
                            <div className="terminal-buttons">
                                <span className="btn red"></span>
                                <span className="btn yellow"></span>
                                <span className="btn green"></span>
                            </div>
                            <div className="terminal-title">security.log</div>
                        </div>
                        <div className="terminal-body">
                            <div className="terminal-line">
                                <span className="prompt">root@thecloudcode:~$</span>
                                <span className="command">tail -f /var/log/security.log</span>
                            </div>
                            <div className="terminal-line">
                                [{tauntData.timestamp}] ALERT: Unauthorized admin access attempt
                            </div>
                            <div className="terminal-line">
                                [{tauntData.timestamp}] IP: {tauntData.yourIp} - Status: BLOCKED
                            </div>
                            <div className="terminal-line">
                                [{tauntData.timestamp}] Action: Redirect to educational content
                            </div>
                            <div className="terminal-line blinking-cursor">
                                [{new Date().toLocaleTimeString()}] Monitoring continues..._
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="taunt-actions">
                        <button onClick={handleGoHome} className="go-home-btn">
                            🏠 Go Home ({countdown}s)
                        </button>
                        <a href="mailto:admin@thecloudcode.com" className="contact-btn">
                            📧 Contact Admin
                        </a>
                    </div>

                    {/* Educational Content */}
                    <div className="educational-content">
                        <h3>🎓 Learn Ethical Hacking Instead!</h3>
                        <div className="resource-links">
                            <a href="https://www.hackerone.com/" target="_blank" rel="noopener noreferrer">
                                Bug Bounty Programs
                            </a>
                            <a href="https://www.hackthebox.eu/" target="_blank" rel="noopener noreferrer">
                                Practice Labs
                            </a>
                            <a href="https://owasp.org/" target="_blank" rel="noopener noreferrer">
                                Security Guidelines
                            </a>
                        </div>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="floating-elements">
                    <div className="float-emoji" style={{animationDelay: '0s'}}>🔒</div>
                    <div className="float-emoji" style={{animationDelay: '2s'}}>🚨</div>
                    <div className="float-emoji" style={{animationDelay: '4s'}}>👨‍💻</div>
                    <div className="float-emoji" style={{animationDelay: '6s'}}>🛡️</div>
                </div>
            </div>
        </div>
    );
};

export default TauntPage;
