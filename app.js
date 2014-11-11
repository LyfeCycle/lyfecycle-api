var mongo = require('mongodb');
var express = require('express');
var monk = require('monk');
var cool = require('cool-ascii-faces');
var database = require('./database');

var app = new express();
var context;
var db;

module.exports.init = function(context, callback) {
	this.context = context;
	app.use(express.static(__dirname + '/public'));
	callback(null);
}

module.exports.listen = function(portNum) {
	app.listen(portNum);
	console.log("Now listening on port: " + this.context.settings.portNum);
}

// routes

app.get('/', function(req, res){
	res.send('info at: https://github.com/LyfeCycle/lyfecycle-api');
});
app.get('/locations', function(req, res){
	database.allLocations(res, req);
});




// // routes 
// var locationsRoutes = require('./routes/locations');
// app.get('/locations', locationsRoutes.allLocations);

// basic routes

// app.get('/', function(req, res){
// 	res.send('info at: https://github.com/LyfeCycle/lyfecycle-api');
// });

// app.get('/database',function(req,res){
//   db.driver.admin.listDatabases(function(e,dbs){
//       res.json(dbs);
//   });
// });

// app.get('/face', function(req, res) {
//   res.send(cool());
// });

// app.get('/port', function(req, res) {
//     res.send('Listening on port ' + context.settings.portNum);
// });

// app.get('/locations', locations.allLocations);
// app.post('/product', authenticateUser, validateProduct, addProduct);

// // functions

// function authenticateUser(req,res, next) {
//   //check req.session for authentication
//   next();
// }

// function validateProduct (req, res, next) {
//    //validate submitted data
//    next();
// }

// function addProduct (req, res) {
//   products = db.get("products");
//   newProduct = {name:"hi"};
//   products.insert(newProduct, function(err, doc){
//   	console.log('Trying to add a product...');
//   	if(err) {
//   		return err;
//   	} else {
//   		console.log('Success: ' + doc[0]);
//         res.send(doc[0]);
//   	}
//   });
// }

// app.listen(context.settings.portNum);

// // location routes
