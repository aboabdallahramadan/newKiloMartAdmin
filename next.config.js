module.exports = {
    async rewrites() {
        return [
            {
                source: '/backend/api/:path*', // Proxy all requests starting with `/backend/api/`
                destination: process.env.NEXT_PUBLIC_API_URL + '/api/:path*', // Your actual API URL
            },
            {
                source: "/kilomart-api/:path*",  // Proxy all requests to the API
                destination: "http://kilomart-001-site1.ptempurl.com/:path*",
            },
        ];
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
};