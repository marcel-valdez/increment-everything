var path = require('path');
var webpack = require('webpack');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(path) {
    return ['bin'].indexOf(path) === -1
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, 'server/lib/entry.js'),
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: "server.bundle.js"
  },
  externals: nodeModules,
  target: 'node',
  debug: true,
  devtool: 'source-map',
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less)$/),
    // used to have source map support for node modules
    new webpack.BannerPlugin('require("source-map-support").install();',
                             { raw: true, entryOnly: false })
  ],
  module: {
    loaders: [
      {
        loader: "babel-loader",
        include: [
          /* don't use babel on node_modules and whatnot  */
          path.resolve(__dirname, "server/lib"),
          path.resolve(__dirname, "server/test"),
        ],
        test: /\.js$/,
        query: {
          plugins: ['transform-runtime'],
          // presets for babel can be defined here or in .babelrc
          presets: ['es2015'/*, 'stage-0' (es-2017), 'react' */]
        }
      }
    ]
  }
}
