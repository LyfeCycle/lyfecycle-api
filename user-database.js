var mongo = require('mongodb');
var monk = require('monk');
var allgood = require('allgood'),
    valid = allgood.valid;

module.exports.init = function(context, callback) {
    module.context = context;
    console.log('Connecting to mongo at: ' + context.settings.mongoURI);
    db = monk(context.settings.mongoURI);
    users = db.get('users');
    if (!users) {
        console.log('Users database does not exist!');
    } else {
    	console.log('Found the user database');
    }
    callback(null);
}

module.exports.allUsers = function(req, res) {
    users.find({}, function (err, docs){
        res.json(docs);
    });
}

module.exports.findUser = function(req, res) {
    if ("facebookId" in req.query) {
        users.find({facebookId : req.query.facebookId}, function (err, docs){
            res.json(docs);
        });
    }
    else if ("facebookId" in req.body) {
        users.find({facebookId : req.body.facebookId}, function (err, docs){
            res.json(docs);
        });
    } else {
        users.find({_id : req.body.userId}, function (err, docs){
            res.json(docs);
        });
    }
}

module.exports.findUserByFacebook = function(req, res) {
    users.find({facebookId : req.body.facebookId}, function (err, docs){
        res.json(docs);
    });
}

module.exports.reset = function(req, res) {
    users.remove({});
    res.send('Reset users!');
}

module.exports.incrementUserMileage = function(req, res) {
	console.log("Trying to change a user's mileage by: " + req.body.miles);
    update = users.findAndModify({
	    query: { _id: req.body.userId },
	    update: {$inc: { milesRidden: parseFloat(req.body.miles) }},
	    new: true // return the updated document
	}, function(err, result) {
		if (err) {
			console.log("Error: " + result.errmsg);
			res.json(result.errmsg);
		} else {
			console.log("Success!");
			res.json(result);
		}
	});
}

module.exports.deleteUser = function(req, res) {
    users.remove({facebookId: req.body.facebookId});
    res.json("deleted");
}

module.exports.addUser = function(req, res) {
    json = req.body;
  if (!valid(userSchema, json)) {
    console.log('Invalid user!');
    res.json(allgood.problems(userSchema, json));
  } else {
    newUser = {
    	"name":json.name, 
		"facebookId":json.facebookId,
		"neighborhoodName":json.neighborhoodName,
		"milesRidden":0 // init this, not supplied in json
    	};
    users.insert(newUser, function(err, doc){
        console.log('Trying to add a user...');
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

// define the keys we want all users to have
var userSchema = {
    "name":"string",
    "facebookId" : "string",
    "neighborhoodName" : "string"
};