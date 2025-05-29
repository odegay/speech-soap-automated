import React, { useState, useEffect } from 'react';
import config from '../config';
import { getVersionInfo as getFrontendVersion } from '../version';

export default function VersionInfo() {
    const [backendVersion, setBackendVersion] = useState(null);
    const frontendVersion = getFrontendVersion();

    useEffect(() => {
        fetch(config.api.endpoints.version)
            .then(response => response.json())
            .then(data => setBackendVersion(data))
            .catch(() => setBackendVersion(null));
    }, []);

    if (!backendVersion) {
        return null;
    }

    return (
        <div className="version-info small text-muted">
            <div>Frontend: v{frontendVersion.version} ({frontendVersion.buildDate})</div>
            <div>Backend: v{backendVersion.version} ({backendVersion.build_date})</div>
            <div>API: {backendVersion.api_version}</div>
            <div>OpenAI: {backendVersion.openai_model}</div>
        </div>
    );
} 