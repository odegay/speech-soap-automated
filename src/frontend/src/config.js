const config = {
    api: {
        baseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000',
        endpoints: {
            health: '/api/health',
            generate: '/api/generate',
            options: '/api/options',
            sections: '/api/sections',
            config: '/api/config',
            phrasebank: '/api/phrasebank'
        }
    },
    auth: {
        username: process.env.REACT_APP_AUTH_USERNAME || 'clinician',
        password: process.env.REACT_APP_AUTH_PASSWORD || 'password'
    }
};

export default config; 