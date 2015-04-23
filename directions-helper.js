var request = require('request');
var polyline = require('polyline');
var mongo = require('mongodb');
var monk = require('monk');

module.exports.init = function(context, callback) {
    module.context = context;
    db = monk(context.settings.mongoURI);
    module.context.locations = db.get('locations'); // locations is a collection
    callback(null);
}

// helper function to get directions
module.exports.getDirections = function(startLat, startLong, destination, callback) {
	var directions; // the json obj we'll eventuall return
	// build the url for our http request
	requestPath = "origin="
				+ startLat + ',' 
				+ startLong 
				+ '&destination=' 
				+ destination 
				+ module.context.settings.googleDirectionsEndReq;
	requestURL = module.context.settings.googleDirectionsStartReq+'/json?' + requestPath;

	request(requestURL, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    directions = JSON.parse(body);
	    // loop through json
	    // 'nearbys' is an array of points that, for each step, represent nearby danger alerts
	    nearbys = [];
	    directions.routes.forEach(function(route) {
	    	route.legs.forEach(function(leg) {
	    		leg.steps.forEach(function(step) { // in each step of the route...
	    			array = polyline.decode(step.polyline.points);
	    			array.forEach(function(latLongPair){
	    				thisLat = latLongPair[0];
	    				thisLong = latLongPair[1];
	    				module.context.locations.find(
	    					{'latitude':{$gte: thisLat - .1, $lte: thisLat + .1},
	    					'longitude':{$gte: thisLong - .1, $lte: thisLong + .1}}
	    				, function(err, docs){
	    					if (err) return(err);
	    					step.alerts = docs;
					    });
	    			});
	    		});
	    	});
	    });
	  } else {
	  	directions = error;
	  }
	  console.log('all done');
	  callback(directions);
	});
}


