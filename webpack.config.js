'use strict';

const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env.USE_MOCK_DATA': JSON.stringify(process.env.USE_MOCK_DATA),
  }),
  new HtmlWebpackPlugin({
    title: 'Amida Blog: あみぶろ',
    template: path.resolve(__dirname, 'src', 'index.html'),
    inject: 'head',
    scriptLoading: 'defer'
  }),
  new MiniCssExtractPlugin(),
  new CompressionPlugin({
    filename: '[path].br[query]',
    algorithm: 'brotliCompress',
    test: /\.(js|css|html|svg)$/,
    compressionOptions: { level: 11 }
  }),
  // remove intersection-observer polyfill
  new webpack.IgnorePlugin(/^intersection-observer$/),
]

// remove axios-mock when not mock
if (process.env.USE_MOCK_DATA !== 'true') {
  plugins.push(new webpack.IgnorePlugin(/^axios$/))
  plugins.push(new webpack.IgnorePlugin(/^axios-mock-adapter$/))
}

module.exports = {
  entry: path.resolve(__dirname, 'src', 'app.js'),

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  plugins,

  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|svg|jpe?g|gif|webp)$/,
        use: {
          loader: 'file-loader',
        },
      },
      {
        test: /\.css/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          'css-loader',
          'postcss-loader'
        ],
      }
    ],
  },

  target: 'web',

  devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',

  mode: process.env.NODE_ENV,

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        ecma: 2018,
      },
      extractComments: true
    })],
    splitChunks: {
      chunks: 'all'
    }
  },
};
