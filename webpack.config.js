var path = require('path');
var webpack = require('webpack');
var common = require('./webpack.config.common');

module.exports = {
  target: "electron",
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
  },
  entry: './src/index.js',
  output: {
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: common.extensions
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ["es2015"]
        },
      }
    ].concat(common.rules)
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('development') }
    }),
    new webpack.HotModuleReplacementPlugin()
  ].concat(common.plugins)
};
