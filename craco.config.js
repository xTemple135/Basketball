const path = require('path');

module.exports = {
  style: {
    sass: {
      loaderOptions: {
        additionalData: `
          @import "src/Shared/assets/styles/index.scss";
        `
      }
    }
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    plugins: {
      typescript: {
        plugin: {
          styledComponents: {
            pure: true
          }
        }
      }
    }
  }
};
