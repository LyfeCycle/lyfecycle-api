var mongo = require('mongodb');
var monk = require('monk');
var port = (process.env.MONGOLAB_URI || 'localhost');

var db = monk(port + ':3000/locationsdb');