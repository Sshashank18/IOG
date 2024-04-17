import React, { useState } from 'react';
import '../styles/Dashboard.css';
import ClientDashboardContent from './ClientDashboardContent';


function ClientDashboard() {
    const [activeTab, setActiveTab] = useState('Dashboard');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div>
            <div className="app">
                <div className="sidebar">
                    <ul>
                        <li className="sideButton" onClick={() => handleTabClick('Dashboard')}>Dashboard</li>
                        <li className="sideButton" onClick={() => handleTabClick('Analytics')}>Analytics</li>
                        <li className="sideButton" onClick={() => handleTabClick('Settings')}>Settings</li>
                    </ul>
                </div>
                <ClientDashboardContent activeTab={activeTab} />
            </div>
        </div>
    )
}

export default ClientDashboard

