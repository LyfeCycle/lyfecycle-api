var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cool = require('cool-ascii-faces');
var locations = require('./routes/locations');

// config
var app = express();
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

var portNum = 3000;
app.set('port', (process.env.PORT || 5000));
app.use(morgan('combined'));

// setup database

var mongo = require('mongodb');
var monk = require('monk');
var port = (process.env.MONGOLAB_URI || 'localhost');
var db = monk(port + ':3000/locationsdb');

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

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