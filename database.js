var mongo = require('mongodb');
var monk = require('monk');
var mongoURI = (process.env.MONGOLAB_URI || 'localhost');
console.log('mongoURI: ' + mongoURI);
var locationdb = monk(mongoURI + '/locationdb');
console.log('locationdb: ' + locationdb);

module.exports = locationdb;