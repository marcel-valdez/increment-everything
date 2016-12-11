const express = require('express');

module.exports = function () {
  const app = express();
  app.put('/increments', (req, res) => {
    res.status(200).send('ok');
    //do some shit!
    //use redis!
  });

  const server = app.listen(3000, () => {
    const port = server.address().port;
    console.log('Express REST services listening on port %s', port);
  });

  return server;
};
