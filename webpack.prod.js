const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  optimization: {
    minimize: true,
  },
  // plugins: [new BundleAnalyzerPlugin()],
});
