var express = require('express');

module.exports = function () {
  var app = express();
  app.put('/increments', function (req, res) {
    res.status(200).send('ok');
    //do some shit!
    //use redis!
  });

  var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log('Express REST services listening on port %s', port);
  });

  return server;
};
