/** the domain name when production build */
const productDomain = 'https://kurone-kito.github.io';
/** the path name when production build */
const productPath = '/dantalion';
/** whether the current environment is CI */
const isCI = !!process.env.CI;

/**
 * the configuration of Next.js
 *
 * @type {Partial<import('next/dist/server/config-shared').NextConfig>}
 */
module.exports = {
  assetPrefix: isCI ? productDomain + productPath : undefined,
  basePath: isCI ? productPath : undefined,
  experimental: { esmExternals: true },
  future: { strictPostcssConfiguration: true },
  reactStrictMode: true,
};
