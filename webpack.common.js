const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const config = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.tsx?$/,
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
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
          outputPath: 'assets/image',
        },
      },
    ],
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js', // wtf... why should I doing this??
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'assets'),
    },
    extensions: ['.ts', '.vue', 'jpg', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new VueLoaderPlugin(),
  ],
};

module.exports = config;
