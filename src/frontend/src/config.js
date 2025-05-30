const getBaseUrl = () => {
    if (process.env.REACT_APP_API_BASE_URL) {
        return process.env.REACT_APP_API_BASE_URL;
    }
    return process.env.NODE_ENV === 'production'
        ? 'https://api.your-domain.com'  // Replace with your actual production API URL
        : 'http://localhost:3000';
};

const config = {
    api: {
        baseUrl: getBaseUrl(),
        endpoints: {
            health: '/api/health',
            version: '/api/version',
            generate: '/api/generate',
            options: (name) => `/api/options/${name}`,
            sections: '/api/sections',
            config: (section) => `/api/config/${section}`,
            phrasebank: (section) => `/api/phrasebank/${section}`
        }
    },
    environment: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production'
};

// Validate configuration
const validateConfig = () => {
    if (!config.api.baseUrl) {
        console.warn('API base URL is not set');
    }
    // Add more validation as needed
};

validateConfig();

export default config; 

