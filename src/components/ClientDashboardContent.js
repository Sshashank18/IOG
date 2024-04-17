import React from 'react';
import ClientCalendar from './ClientCalendar';

export default function ClientDashboardContent({activeTab}) {

    let content;
    if (activeTab === 'Dashboard') {
        content = <div><ClientCalendar/></div>;
    } else if (activeTab === 'Analytics') {
        content = <div>This is the Analytics content</div>;
    } else if (activeTab === 'Settings') {
        content = <div>This is the Settings content</div>;
    }
    
    return (
        <div className="content">{content}</div>
    )
}
