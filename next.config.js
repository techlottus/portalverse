/** @type {import('next').NextConfig} */
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const { env } = require('process');

const securityHeaders = [
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  }
];
const strapiUrl = env.NEXT_PUBLIC_STRAPI_URL

const nextConfig = {
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: ['drive.google.com','shutterstock.com',`${strapiUrl}/uploads/`]
  },
  productionBrowserSourceMaps: true,
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
  rewrites: () => {
    return {
      fallback: [
        {
          source: '/admin/:path*',
          destination: `https://uane-admin.vercel.app/:path*`,
        }
      ],
    }
  },
  webpack: (config, { isServer }) => {
    // console.log(process.env.ANALYZE)
    // if (!!process.env.ANALYZE) {
    //  config.plugins.push(
    //    new BundleAnalyzerPlugin({
    //      analyzerMode: 'server',
    //      analyzerPort: isServer ? 8888 : 8889,
    //      openAnalyzer: true,
    //    })
    //  )
    // } else {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"]
      })
    // }
    return config
  },
}

module.exports = nextConfig
