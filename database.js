var mongo = require('mongodb');
var monk = require('monk');
var context;
var db;

var locations;
var context;

module.exports.init = function(context, callback) {
    module.context = context;
    console.log('Connecting to mongo with URI: ' + context.settings.mongoURI);
    db = monk(context.settings.mongoURI + 'locations');
    locations = db.get('locations');
    callback(null);
}

module.exports.allLocations = function(req, res) {
    locations.find({}, function (err, docs){
        res.json(docs);
    });
}

module.exports.addLocation = function(req, res) {
  newLocation = req.body;
  if (!newLocation) {
    res.send('request body was empty!');
  } else {
    locations.insert(newLocation, function(err, doc){
        console.log('Trying to add a location...');
        if(err) {
            console.log(err);
            return err;
        } else {
            console.log('Success!');
        }
    });
  }
}