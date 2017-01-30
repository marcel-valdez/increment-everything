var path = require('path');
var webpack = require('webpack');
var fs = require('fs');

var HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, 'client/lib/index.jsx'),
  ],
  externals: {
    'jsdom': 'window',
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': 'window',
    'react/addons': 'window',
    'react/lib/ReactContext': 'window'
  },
  output: {
    path: path.join(__dirname, 'build/client/'),
    filename: "bundle.js"
  },
  resolve: {
    root: [
      path.resolve(__dirname, '.')
    ]
  },
  target: 'web',
  debug: true,
  devtool: 'inline-source-map',
  plugins: [
    // used to have source map support for node modules
    new HtmlPlugin({
      template: path.resolve(__dirname, 'client/index.html'),
      filename: 'index.html',
      inject: 'body'
    })
  ],
  module: {
    loaders: [
      {
        loader: "babel-loader",
        include: [
          /* don't use babel on node_modules and whatnot  */
          path.resolve(__dirname, "common/lib"),
          path.resolve(__dirname, "common/test"),
          path.resolve(__dirname, "client/lib"),
          path.resolve(__dirname, "client/test")
        ],
        test: /\.jsx?$/,
        query: {
          plugins: ['transform-runtime'],
          // babel presets can be defined here or in .babelrc
          presets: ['es2015', 'react' /*, 'stage-0' (es-2017) */]
        }
      }
    ]
  }
}
