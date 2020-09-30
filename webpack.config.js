const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const config = {
  mode: 'development',
  entry: './index.ts',
  devtool: 'inline-source-map',
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
        test: /\.ts?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.(c|sc)ss$/,
        loader: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  // TODO: what resolver doing?
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js', // wtf... why should I doing this??
    },
    extensions: ['.vue', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new VueLoaderPlugin(),
  ],
};

module.exports = config;
