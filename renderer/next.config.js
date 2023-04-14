const webpack = require('webpack')


module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = 'electron-renderer';
    }


    return config;
  },

  reactStrictMode: true,
  swcMinify: true,

  compiler: {
    styledComponents: true,
  },

  images: {
    unoptimized: true
  }
};
