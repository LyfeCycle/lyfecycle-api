var async = require('async');

// setup

var context = {};
context.settings = require('./settings');
async.series([setupDatabases, setupApp, listen], ready); // do these things in order!

function setupDatabases(callback) {
  context.directionsHelper = require('./directions-helper');
  context.directionsHelper.init(context);
	context.locationDb = require('./location-database');
	context.locationDb.init(context, callback);
  context.userDb = require('./user-database');
  context.userDb.init(context, callback);
}

function setupApp(callback) {
  context.app = require('./app');
  context.app.init(context, callback);
}

function listen(callback) {
  context.app.listen(context.settings.portNum);
  callback(null); // don't do anything
}

function ready(err)
{
  if (err)
  {
    throw err;
  }
  console.log('All ready!');
}