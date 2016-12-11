const express = require('express');
const mongo = require('mongodb');
const monk = require('monk');

module.exports = function (config = {
  db: {
    connection: 'localhost:27017/increments-db'
  },
  server: {
    port: 3000
  }
}) {
  const app = express();
  const db = monk(config.db.connection);
  const increments = db.get('increments');

  app.put('/increments', (req, res) => {
    increments.insert({
      "description": req.query.description
    }).then(
      doc => {
        res.status(200).send("Added new increment: " + doc.toString());
      },
      err => {
        res.status(500).send("Failed to add the new increment: " + err);
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
