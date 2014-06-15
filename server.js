var fs = require('fs');
var https = require('https');

var express = require('express');
var app = express();

app.use('/static', express.static(__dirname + '/build'));

app.get('/', function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  fs.createReadStream('./index.html').pipe(res);
});

// Proxy to access api
app.get('/api', function(req, res) {
  https.get({
    host: 'api.parkatmyhouse.com',
    path: '/1.1/location/?q=' + req.query.q
  }, function(resp) {
    resp.pipe(res);
  }).on("error", function(e) {
    console.error("Got error: " + e.message);
    res.send(404);
  });
});

module.exports = {};
module.exports.start = function() {
  app.listen(3000, function() {
    console.log('Listening on port 3000');
  });
};
