module.exports = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.testjs$/,
      loader: 'ignore-loader',
    });
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
