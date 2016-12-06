var request = require('supertest');
var createServer = require('../src/server.js');
describe('loading express', function () {
  var server;
  beforeEach(function () {
    server = createServer();
  });
  afterEach(function (done) {
    server.close(done);
  });
  it('responds to /increments', function testIncrements(done) {
    request(server).put('/increments').expect(200, done);
  });
  it('404 everything else', function testPath(done) {
    request(server).get('/foo/bar').expect(404, done);
  });
});
