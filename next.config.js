module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  eslint: {
    plugins: ['jest'],
  },
  env: {
    'jest/globals': true,
  },
};
