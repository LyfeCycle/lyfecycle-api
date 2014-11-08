var express = require('express');
var app = express();

app.get('/test', function(req, res) {
  res.type('text/plain');
  res.send("it's working!");
});

app.listen(process.env.PORT || 4730);