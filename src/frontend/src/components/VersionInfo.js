import React, { useState, useEffect } from 'react';
import config from '../config';

export default function VersionInfo() {
    const [version, setVersion] = useState(null);

    useEffect(() => {
        fetch(`${config.api.baseUrl}${config.api.endpoints.version}`)
            .then((r) => r.json())
            .then(setVersion)
            .catch(error => console.error('Error fetching version:', error));
    }, []);

    if (!version) return null;

    return (
        <div className="version-info small text-muted">
            <div>Backend: v{version.version} ({version.build_date})</div>
            <div>API: {version.api_version}</div>
            <div>OpenAI: {version.openai_model}</div>
        </div>
    );
} 