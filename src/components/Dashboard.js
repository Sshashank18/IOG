import React, { useState } from 'react';
import DashboardContent from './DashboardContent';
import '../styles/Dashboard.css';


function Dashboard() {
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
                <DashboardContent activeTab={activeTab} />
            </div>
        </div>
    )
}

export default Dashboard

