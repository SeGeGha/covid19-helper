const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = (env = {}) => {
  const isProd = env === 'production';

  const getLoader = () => (isProd ? MiniCssExtractPlugin.loader : 'style-loader');

  const getPlugins = () => {
    const plugins = [
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        filename: './index.html',
        favicon: './src/assets/icon/favicon.ico',
      }),
    ];

    if (isProd) {
      plugins.push(new MiniCssExtractPlugin({
        filename: '[name]-[hash:8].css',
      }));
    }

    return plugins;
  };

  return {
    mode: isProd ? 'production' : 'development',
    entry: ['./src/js/index.js', './src/scss/style.scss'],
    output: {
      path: path.join(__dirname, '/dist'),
      filename: 'main.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.(png|jpg|gif|jpeg|ico|svg)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/img',
              esModule: false,
            },
          }],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            { loader: getLoader() },
            { loader: 'css-loader' },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader' },
          ],
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.js'],
    },
    devServer: {
      open: true,
      historyApiFallback: true,
      watchContentBase: true,
      contentBase: path.join(__dirname, 'dist'),
    },
    plugins: getPlugins(),
  };
};

module.exports = config;
