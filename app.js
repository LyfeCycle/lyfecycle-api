var express = require('express');
var locations = require('./routes/locations');

// config

var portNum = 3000;

var app = express();

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});

// routes

app.get('/locations', locations.findAll);
app.get('/locations/:id', locations.findById);
app.post('/locations', locations.addLocation);
app.put('/locations/:id', locations.updateLocation);
app.delete('/locations/:id', locations.deleteLocation);

app.listen(portNum);
console.log('Listening on port ' + portNum);