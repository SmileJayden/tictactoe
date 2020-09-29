const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
};

module.exports = config;
