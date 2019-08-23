var path = require('path');
var webpack = require('webpack');
var common = require('./webpack.config.common');

module.exports = {
  target: "electron",
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/'),
    filename: 'bundle.js',
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
      'process.env': { NODE_ENV: JSON.stringify('production') }
    })
  ].concat(common.plugins)
}
