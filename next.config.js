module.exports = {
    async rewrites() {
        return [
            {
                source: '/backend/api/:path*', // Proxy all requests starting with `/api/`
                destination: process.env.NEXT_PUBLIC_API_URL + '/api/:path*', // Your actual API URL
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