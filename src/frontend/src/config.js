const config = {
    api: {
        baseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000',
        endpoints: {
            health: '/api/health',
            version: '/api/version',
            generate: '/api/generate',
            options: (name) => `/api/options/${name}`,
            sections: '/api/sections',
            config: (section) => `/api/config/${section}`,
            phrasebank: (section) => `/api/phrasebank/${section}`
        }
    }
};

export default config; 

