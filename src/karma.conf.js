var path = require('path');
var fs = require('fs');
var clientTestFiles = getTestFiles('client/test/');
var commonTestFiles = getTestFiles('common/test/');

var INIT_FILE = ['client/test/init.js'];
var files = INIT_FILE.concat(clientTestFiles.concat(commonTestFiles));

function getTestFiles(dir) {
  var topFiles = fs.readdirSync(dir).map(f => dir + f)
      .filter(f => f.endsWith('test.js') || f.endsWith('test.jsx'));
  var subdirs = fs.readdirSync(dir)
      .filter(file => fs.lstatSync(dir + file).isDirectory());

  return subdirs.map(subdir => getTestFiles(dir + subdir + '/'))
    .reduce((files, subdirFiles) => files.concat(subdirFiles), topFiles);
}


function webpackConfig() {
  var config = require('./client.webpack.config');
  config.entry = undefined;
  return config;
}

var jsPreprocessors = ['webpack', 'sourcemap'];
module.exports = function(config) {
  config.set({
    plugins: [
      require('karma-chrome-launcher'),
      require('karma-mocha'),
      require('karma-chai'),
      require('karma-webpack'),
      require('karma-sourcemap-loader')
    ],
    browsers: ['Chrome'],
    frameworks: ['mocha', 'chai'],
    files: files,
    preprocessors: {
      'common/**/*.js': jsPreprocessors,
      'client/**/*.js': jsPreprocessors,
      'client/**/*.jsx': jsPreprocessors
    },
    webpack: webpackConfig(),
    webpackMiddleware: {
      stats: 'errors-only'
    }
  })
}
