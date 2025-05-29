const config = {
    api: {
        baseUrl: 'http://localhost:3000',  // Backend URL
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