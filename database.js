var mongo = require('mongodb');
var monk = require('monk');
var mongoURI = (process.env.MONGOLAB_URI || 'localhost');
var locationdb = require('monk')(mongoURI + '/locationdb')