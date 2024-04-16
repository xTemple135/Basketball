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
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'] 
    },
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
