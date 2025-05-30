import React, { useState, useEffect } from 'react';
import config from '../config';

const BackendStatus = () => {
    const [backendStatus, setBackendStatus] = useState({
        isChecking: true,
        isAvailable: false,
        error: null
    });

    useEffect(() => {
        const checkBackend = async () => {
            try {
                const response = await fetch(`${config.api.baseUrl}${config.api.endpoints.health}`);
                if (response.ok) {
                    setBackendStatus({
                        isChecking: false,
                        isAvailable: true,
                        error: null
                    });
                } else {
                    throw new Error('Backend health check failed');
                }
            } catch (error) {
                setBackendStatus({
                    isChecking: false,
                    isAvailable: false,
                    error: 'Unable to connect to the backend service. Please try again later.'
                });
            }
        };

        checkBackend();
    }, []);

    if (backendStatus.isChecking) {
        return null; // Don't show anything while checking
    }

    if (!backendStatus.isAvailable) {
        return (
            <div style={{
                backgroundColor: '#fff3cd',
                color: '#856404',
                padding: '1rem',
                margin: '1rem',
                borderRadius: '4px',
                border: '1px solid #ffeeba',
                textAlign: 'center'
            }}>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>⚠️ Service Unavailable</h3>
                <p style={{ margin: 0 }}>{backendStatus.error}</p>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                    If this issue persists, please contact support.
                </p>
            </div>
        );
    }

    return null; // Don't show anything if backend is available
};

export default BackendStatus; 