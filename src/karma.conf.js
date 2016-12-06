module.exports = function(config) {
  config.set({
    plugins: ['karma-chrome-launcher', 'karma-mocha'],
    browsers: ['Chrome'],
    frameworks: ['mocha'],
    files: [
      'client/test/*test.js'
    ]
  })
}
