module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        resolve: {
          fallback: {
            fs: false,
          },
        },
      };
    }
    return config;
  },
};
