var mongo = require('mongodb');
var express = require('express');
var monk = require('monk');
var cool = require('cool-ascii-faces');
var db =  monk('localhost:27017/test');
var app = new express();

// setup database
var mongoURI = (process.env.MONGOLAB_URI || 'localhost');
var mongoPort = 27017;
var db =  monk(mongoURI + ':' + mongoPort + 'test');

app.use(express.static(__dirname + '/public'));

// basic routes

app.get('/', function(req, res){
	res.send('info at: https://github.com/LyfeCycle/lyfecycle-api');
});

app.get('/database',function(req,res){
  db.driver.admin.listDatabases(function(e,dbs){
      res.json(dbs);
  });
});

app.get('/face', function(req, res) {
  res.send(cool());
});

app.get('/port', function(req, res) {
    res.send('Listening on port ' + portNum);
});

app.post('/product', authenticateUser, validateProduct, addProduct);

// functions

function authenticateUser(req,res, next) {
  //check req.session for authentication
  next();
}

function validateProduct (req, res, next) {
   //validate submitted data
   next();
}

function addProduct (req, res) {
  products = db.get("products");
  newProduct = {name:"hi"};
  products.insert(newProduct, function(err, doc){
  	console.log('Trying to add a product...');
  	if(err) {
  		return err;
  	} else {
  		console.log('Success: ' + doc[0]);
        res.send(doc[0]);
  	}
  });
}

app.listen(3000)

// location routes
