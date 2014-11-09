var port = 3000;
var express = require('express');
var app = express();
var locations = require('./routes/locations');

// routes

app.get('/locations', locations.findAll);
app.get('/locations/:id', locations.findById);

app.listen(port);
console.log('Listening on port ' + port);