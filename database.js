var mongo = require('mongodb');
var monk = require('monk');
var validate = require('./validations');


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

module.exports.reset = function(req, res) {
 locations.remove({});
 count = locations.count;
 if (count == 0) {
    console.log('All locations removed!');
 } else {
    console.log('There are ' + count + ' locations');
 }
 res.send('Reset locations!');
}

module.exports.addLocation = function(req, res) {
    json = req.body;
  if (!validate.validLocation(json)) {
    console.log('Invalid location!');
    res.json('Invalid location!');
  } else {
    newLocation = {}
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