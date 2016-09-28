const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DefinePlugin = require('webpack').DefinePlugin;
const config = require('config');

module.exports = {
  entry: path.resolve(__dirname, 'app/js/main'),
  devServer: {
    outputPath: path.join(__dirname, 'build'),
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'build/js'),
    publicPath: '/js/',
    filename: 'bundle.js',
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new CopyWebpackPlugin([
      {
        context: path.resolve(__dirname, 'app/static'),
        from: '**/*',
        to: path.resolve(__dirname, 'build'),
      },
    ]),
    new DefinePlugin({
      WPDEF: {
        TESTNET: config.get('testnet'),
        CONTRACT_ADDRESS: JSON.stringify(config.get('contract.address')),
        HELPER_API_URL: JSON.stringify(config.get('helperApiUrl')),
      },
    }),
  ],
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['eslint'],
      },
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel'],
      },
      {
        test: /\.less$/,
        loader: 'style!css!less',
      },
    ],
  },
};
