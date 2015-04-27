var express = require('express');
var bodyParser = require('body-parser');
var cool = require('cool-ascii-faces');

var app = new express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

var context;

module.exports.init = function(context, callback) {
	module.context = context;
	callback(null);
}

module.exports.listen = function(portNum) {
	app.listen(portNum);
	console.log("Now listening on port: " + module.context.settings.portNum);
}

// routes

// locations

app.get('/', function(req, res){
	res.json('info at: https://github.com/LyfeCycle/lyfecycle-api');
});

app.get('/locations', function(req, res){
	module.context.locationDb.allLocations(req, res);
});

app.get('/locations/id', function(req, res){
	module.context.locationDb.findLocation(req, res);
});

app.get('/locations/directions', function(req, res){
	module.context.locationDb.getDirections(req, res);
});

app.get('/locations/region', function(req, res){
	module.context.locationDb.locationsWithin(req, res);
});

app.get('/locations/tagged', function(req, res){
	module.context.locationDb.locationsByTag(req, res);
});

app.post('/locations', function(req, res){
	module.context.locationDb.addLocation(req, res);
});

app.post('/locations/reset', function(req, res){
	module.context.locationDb.reset(req, res);
});

// users

app.get('/users', function(req, res){
	module.context.userDb.allUsers(req, res);
});

app.get('/users/find', function(req, res){
	module.context.userDb.findUser(req, res);
});

app.post('/users', function(req, res){
	module.context.userDb.addUser(req, res);
});

app.post('/users/delete', function(req, res){
	module.context.userDb.deleteUser(req, res);
});

app.post('/users/change-mileage', function(req, res){
	module.context.userDb.incrementUserMileage(req, res);
});

app.post('/users/reset', function(req, res){
	module.context.userDb.reset(req, res);
});

app.get('/face', function(req, res) {
  res.send(cool());
});
