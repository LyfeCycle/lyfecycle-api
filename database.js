var mongo = require('mongodb');
var monk = require('monk');
var context;
var db;

var locations;
var context;

module.exports.init = function(context, callback) {
    module.context = context;
    db = monk(context.settings.mongoURI + ':' + context.settings.mongoPort + 'locations');
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
  locations.insert(newLocation, function(err, doc){
     console.log('Trying to add a location...');
     if(err) {
         return err;
     } else {
         console.log('Success: ' + doc[0]);
        res.send(doc[0]);
     }
  });
}