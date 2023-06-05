/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
    i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['en-US', 'fr', 'nl-NL'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'en-US',
    },
    images:{
      domains:['t4.ftcdn.net', 'localhost']
    },
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

const nextTranslate = require('next-translate')

module.exports = nextTranslate(nextConfig);
