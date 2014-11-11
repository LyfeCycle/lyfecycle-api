var mongo = require('mongodb');
var express = require('express');
var monk = require('monk');
var async = require('async');
var cool = require('cool-ascii-faces');

// setup

var context = {};
context.settings = require('./settings');
async.series([setupDatabase, setupApp, listen], ready);

function setupDatabase(callback) {
  console.log('setupDatabase');
	context.db = require('./database');
	context.db.init(context, callback);
}

function setupApp(callback) {
  console.log('setupApp');
	  context.app = require('./app');
	  context.app.init(context, callback);
}

function listen(callback) {
  console.log('listen');
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