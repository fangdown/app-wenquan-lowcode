const WebpackBar = require('webpackbar');
const { addBeforeLoaders, loaderByName } = require("@craco/craco");
module.exports = {
  webpack: {
    configure(webpackConfig) {
      addBeforeLoaders(webpackConfig, loaderByName("style-loader"), "thread-loader");
      addBeforeLoaders(webpackConfig, loaderByName("style-loader"), "cache-loader");
      if (webpackConfig.mode === 'production') {
        // 去除map文件
         webpackConfig.devtool = false
        // 抽离公共代码，只在生产环境
        if (webpackConfig.optimization == null) {
          webpackConfig.optimization = {}
        }
        webpackConfig.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            antd: {
              name: 'antd-chunk',
              test: /antd/,
              priority: 100,
            },
            reactDom: {
              name: 'reactDom-chunk',
              test: /react-dom/,
              priority: 99,
            },
            vendors: {
              name: 'vendors-chunk',
              test: /node_modules/,
              priority: 98,
            },
          },
        }
      }
      return webpackConfig
    },
    plugins: [
      new WebpackBar()
    ]
  },

  devServer: {
    port: 8000, // B 端，前端
    proxy: {
      '/api': 'http://localhost:3001', // Mock
    },
  },
}
