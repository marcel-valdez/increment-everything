const request = require('supertest');
const createServer = require('../lib/server.js');
const mongo = require('mongodb');
const monk = require('monk');
const chai = require('chai');
const assert = chai.assert;

const doAsync = function(assertion, done) {
  try {
    assertion();
    done();
  } catch(e) {
    done(e);
  }
};

const testConfig = {
  db: {
    connection: 'localhost:27017/increments-test-db'
  },
  server: {
    port: 3001
  }
};

describe('test server', function () {
  let server;
  const db = monk(testConfig.db.connection);
  const increments = db.get('increments');
  beforeEach(() => server = createServer(testConfig));
  afterEach(done => {
    increments.drop().then(() => {
      server.close(done);
    });
  });

  it('responds to /increments', function testPutIncrements(done) {
    request(server).put('/increments?description=test').expect(200, done);
  });

  it('can delete an existing increment', function testDeleteIncrements(done) {
    const id = monk.id();
    increments.insert({ "_id": id.toString() })
      .then(doc => {
        request(server).delete('/increments/' + id.toString())
          .expect(200)
          .end(res => {
            increments.findOne(id)
              .then(doc => doAsync(() => assert.isNotOk(doc), done));
          });
      });
  });

  it('can get a specific increment', function getIncrement(done) {
    increments.insert({ "description": "test-description" })
      .then(doc => {
        request(server).get('/increments/' + doc['_id'])
          .expect('Content-Type', /json/)
          .expect(res => {
            res.body['_id'] = monk.id(res.body['_id'])
          })
          .expect(200, doc, done);
      });
  });

  it('can get all increments', function getAllIncrements(done) {
    const incs = [
      { "description": "test-description-1" },
      { "description": "test-description-2" }
    ];
    increments.insert(incs)
      .then(docs => {
        request(server).get('/increments/all')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(res => {
            res.body.forEach(doc => doc['_id'] = monk.id(doc['_id']))
          })
          .expect(200, docs)
          .end(done);
      });
  });

  it('404 everything else', function testPath(done) {
    request(server).get('/foo/bar').expect(404, done);
  });
});
