module.exports = function(config) {
  config.set({
    plugins: ['karma-chrome-launcher', 'karma-mocha'],
    browsers: ['Chrome'],
    frameworks: ['mocha'],
    files: [
      { pattern: 'client/test/*test.js' },
      { pattern: 'client/test/**/*test.js' }
    ],
    preprocessors: {
      'test/*test.js': ['webpack'],
      'test/**/*test.js': ['webpack']
    },
    webpack: {},
    webpackMiddleware: {
      stats: 'errors-only'
    }
  })
}
