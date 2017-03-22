import express from 'express';
import mongo from 'mongodb';
import monk from 'monk';

module.exports = function (config = {
  db: {
    // TODO: database configuration should come from a webpack option
    connection: 'localhost:27017/increments-db'
  },
  server: {
    // TODO: port configuration should come from a webpack option
    port: 3000
  }
}) {

  const app = express();
  const db = monk(config.db.connection);
  const increments = db.get('increments');

  // serve the built resources
  // TODO(prod): Serve static resources from production publish directory
  app.use(express.static('build/client'));

  function parseJsonPayload(req) {
    return new Promise((onSuccess, onError) => {
      let jsonStr = '';
      req.on('data', payloadChunk => jsonStr += payloadChunk);
      req.on('end', () => {
        let jsonObj = null;
        try {
          jsonObj = JSON.parse(jsonStr)
        } catch(ex) {
          return onError(ex);
        }

        return onSuccess(jsonObj);
      });
    });
  }

  app.post('/increments', (req, res) => {
    parseJsonPayload(req)
      .then(increment => {
        if (!increment.description) {
          res.status(500).send("Description cannot be empty");
          return;
        }

        increments.insert(increment).then(
          doc => {
            res.status(200).send("Added new increment: " + doc.toString());
          },
          err => {
            res.status(500).send("Failed to add the new increment: " + err);
          });
      },
      err => res.status(500).send("Failed to parse JSON payload: " + err))
  });

  app.put('/increments/:id', (req, res) => {
    const incrementId = req.params.id;
    parseJsonPayload(req)
      .then(increment => increments.update({ '_id': incrementId }, increment)
            .then(doc =>
                  res.status(200).send("Updated increment: " + doc.toString()),
                  err => {
                    const msg =
                          "Failed to update increment with id: " + incrementId;
                    console.error(msg);
                    res.status(500).send(msg);
                  }));
  });

  app.delete('/increments/:id', (req, res) => {
    const  incrementId = req.params.id;
    const objId = monk.id(incrementId);
    increments.remove(objId).then(
      doc => {
        res.status(200).send("Removed increment: " + doc.toString());
      },
      err => {
        const msg = "Failed to remove increment with id: " + incrementId;
        console.error(msg);
        res.status(500).send(msg);
      });
  });

  app.get('/increments/all', (req, res) => {
    increments.find({})
      .then(
        docs => res.status(200).json(docs),
        err => res.status(500).send("Unable to retrieve documents"))
  });

  app.get('/increments/:id', (req, res) => {
    increments.findOne(monk.id(req.params.id))
      .then(
        doc => {
          res.status(200).json(doc)
          res.end();
        },
        err => res.status(500).send("No increment with id: " + req.params.id));
  });

  const server = app.listen(config.server.port, () => {
    const port = server.address().port;
    console.log('Express REST services listening on port %s', port);
  });

  return server;
};
