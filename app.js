var express = require('express');
var bodyParser = require('body-parser');
var cool = require('cool-ascii-faces');
var locations = require('./routes/locations');

// config
var app = express();
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

if (app.get('env')) {
	app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
}

var portNum = 3000;
app.set('port', (process.env.PORT || 5000))

// location routes

app.get('/locations', locations.findAll);
app.get('/locations/:id', locations.findById);
app.post('/locations', locations.addLocation);
app.put('/locations/:id', locations.updateLocation);
app.delete('/locations/:id', locations.deleteLocation);
app.post('/locations/reset', locations.resetDB);

// other routes

app.get('/', function(req, res) {
  res.send(cool());
});

app.get('/port', function(req, res) {
    res.send('Listening on port ' + portNum);
});

// server start

app.listen(portNum);
console.log('Listening on port ' + portNum);