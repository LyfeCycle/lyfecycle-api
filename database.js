var mongo = require('mongodb');
var monk = require('monk');

var context;
var locations;

module.exports.init = function(context, callback) {
    module.context = context;
    console.log('Connecting to mongo at: ' + context.settings.mongoURI);
    db = monk(context.settings.mongoURI);
    locations = db.get('locations');
    if (!locations) {
        console.log('Locations database does not exist!');
    }
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
    res.json('Request body was empty!');
  } else {
    locations.insert(newLocation, function(err, doc){
        console.log('Trying to add a location...');
        if(err) {
            console.log(err);
            res.json(err);
        } else {
            console.log('Success!');
            res.json('Success!');
        }
    });
  }
}