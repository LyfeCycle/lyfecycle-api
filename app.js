var express = require('express');
var bodyParser = require('body-parser');
var locations = require('./routes/locations');

// config

var portNum = 3000;

var app = express();
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

if (app.get('env')) {
	app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
}

// routes

app.get('/locations', locations.findAll);
app.get('/locations/:id', locations.findById);
app.post('/locations', locations.addLocation);
app.put('/locations/:id', locations.updateLocation);
app.delete('/locations/:id', locations.deleteLocation);
app.post('/locations/reset', locations.resetDB);

app.get('/test', function(req, res) {
    res.send("It's working!");
});

// server start

app.listen(portNum);
console.log('Listening on port ' + portNum);