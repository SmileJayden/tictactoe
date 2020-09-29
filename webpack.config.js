const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const config = {
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(c|sc)ss$/,
        loader: ['style-loader','css-loader', 'sass-loader'],
      },
    ],
  },
  // TODO: what resolver doing?
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js', // wtf... why should I doing this??
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new VueLoaderPlugin(),
  ],
};

module.exports = config;
