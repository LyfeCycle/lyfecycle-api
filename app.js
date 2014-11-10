var express = require('express');
var locations = require('./routes/locations');

// config

var portNum = 3000;

var app = express();


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
app.listen(portNum);
console.log('Listening on port ' + portNum);