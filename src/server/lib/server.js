import express from 'express';
import mongo from 'mongodb';
import monk from 'monk';
import { toFormattedString } from 'common/lib/utilities.js';

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

  app.put('/increments', (req, res) => {
    let json = '';
    req.on('data', payloadChunk => json += payloadChunk);

    req.on('end', () => {
      const increment = JSON.parse(json);
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
    });
  });

  app.delete('/increments/:id', (req, res) => {
    const objId = monk.id(req.params.id);
    increments.remove(objId).then(
      doc => {
        res.status(200).send("Removed increment: " + doc.toString());
      },
      err => {
        console.error("Failed to remove increment with id: " + req.params.id);
        res.status(500).send("Failed to remove increment with id: " + req.params.id);
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
