var mongo = require('mongodb');
var monk = require('monk');
var context;
var db;

var locationCollection;
var settings;

module.exports.init = function(context, callback) {
    this.context = context;
    this.settings = context.settings;
    db = monk(context.settings.mongoURI + ':' + context.settings.mongoPort + 'locations');
    callback(null);
}

module.exports.allLocations = function(res, req) {
    locations = db.get('locations');
    locations.find({}, function (err, docs){
        res.json(docs);
    });
}