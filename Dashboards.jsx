// Dashboards.jsx
import React, { useState, useEffect } from 'react';
import powerbi from 'powerbi-client';

const Dashboards = ({ projectId }) => {
    const [selectedDashboard, setSelectedDashboard] = useState('Overall Progress');

    useEffect(() => {
        // Initialize Power BI embedding
        const embedReport = async () => {
            const embedUrl = await fetchEmbedUrl(selectedDashboard, projectId);
            const token = await fetchEmbedToken(selectedDashboard, projectId);
            
            const reportContainer = document.getElementById('reportContainer');
            const models = window['powerbi-client'].models;

            const config = {
                type: 'report',
                embedUrl: embedUrl,
                accessToken: token,
                tokenType: models.TokenType.Embed,
                settings: {
                    filterPaneEnabled: false,
                    navContentPaneEnabled: false
                }
            };

            powerbi.reset(reportContainer);
            powerbi.embed(reportContainer, config);
        };

        embedReport();
    }, [selectedDashboard, projectId]);

    const fetchEmbedUrl = async (dashboard, projectId) => {
        // API call to backend to get embed URL based on dashboard type and project
    };

    const fetchEmbedToken = async (dashboard, projectId) => {
        // API call to backend to get embed token based on dashboard type and project
    };

    return (
        <div className="dashboards-tab">
            <h2>Dashboards</h2>
            <select 
                value={selectedDashboard} 
                onChange={(e) => setSelectedDashboard(e.target.value)}
            >
                <option value="Welding">Welding</option>
                <option value="Safety">Safety</option>
                <option value="Overall Progress">Overall Progress</option>
            </select>
            <div id="reportContainer" style={{ height: '600px' }}></div>
        </div>
    );
};

export default Dashboards;
