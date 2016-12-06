module.exports = {
  entry: "./server/src/server.js",
  output: {
    path: __dirname,
    filename: "server.bundle.js"
  },
  module: {
    loaders: []
  }
}
