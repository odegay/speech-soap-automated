const getBaseUrl = () => {
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('REACT_APP_API_BASE_URL:', process.env.REACT_APP_API_BASE_URL);
    
    if (process.env.REACT_APP_API_BASE_URL) {
        return process.env.REACT_APP_API_BASE_URL;
    }
    
    const isProd = process.env.NODE_ENV === 'production';
    console.log('Is production:', isProd);
    
    const baseUrl = isProd
        ? 'https://soap-backend-29375673872.us-central1.run.app'
        : 'http://localhost:3000';
    
    console.log('Using base URL:', baseUrl);
    return baseUrl;
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
    console.log('Final config:', {
        baseUrl: config.api.baseUrl,
        environment: config.environment,
        isProduction: config.isProduction
    });
};

validateConfig();

export default config; 

