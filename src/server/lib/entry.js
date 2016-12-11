const createServer = require('./server.js');

// in the future parameterize dependencies and configurations
// for the server for testing
module.exports = createServer({
  db: {
    connection: 'localhost:27017/increments-db'
  },
  server: {
    port: 3000
  }
});
