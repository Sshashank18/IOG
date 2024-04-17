import React from 'react';
import Calendar from './Calendar';

export default function DashboardContent({activeTab}) {


    let content;
    if (activeTab === 'Dashboard') {
        content = <div><Calendar/></div>;
    } else if (activeTab === 'Analytics') {
        content = <div>This is the Analytics content</div>;
    } else if (activeTab === 'Settings') {
        content = <div>This is the Settings content</div>;
    }
    
    return (
        <div className="content">{content}</div>
    )
}
