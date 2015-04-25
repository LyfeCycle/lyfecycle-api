var request = require('request');
var polyline = require('polyline');
var mongo = require('mongodb');
var monk = require('monk');
var forEach = require('async-foreach').forEach;
var async = require('async');


module.exports.init = function(context, callback) {
    module.context = context;
    db = monk(context.settings.mongoURI);
    module.context.locations = db.get('locations'); // locations is a collection
    callback(null);
}

// helper function to get directions
module.exports.getDirections = function(startLat, startLong, destination, bigCallback) {
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
		    // store async tasks
			asyncTasks = [];
			numQueries = 0; // keep track of how many we had to do
			displacement = .01 // only recheck a point if it is this far away from the last one
		    queryRadius = .01 // look for points within this amount of each point
		    // loop through json
		    directions.routes.forEach(function (route) {
		    	route.legs.forEach(function(leg) {
		    		leg.steps.forEach(function(step) { // in each step of the route...
		    			array = polyline.decode(step.polyline.points);
		    			lastPair = []; // keep track of the last point we saw so we can decide if we have to recheck the next one
		    			lastAlerts = []; // if the point was close enough, the alerts for this step are the same as for the last step
		    			array.forEach(function (latLongPair){ 
						    thisLat = latLongPair[0];
		    				thisLong = latLongPair[1];
			    			if (lastPair==[] || (Math.abs(lastPair[0]-thisLat) > displacement && Math.abs(lastPair[1]-thisLong) > displacement)) {
		    					numQueries += 1;
		    					asyncTasks.push(function(callback1) {
			    					console.log('starting a find...');
		    						module.context.locations.find({
			    						'latitude':{$gte: thisLat - queryRadius, $lte: thisLat + queryRadius},
			    						'longitude':{$gte: thisLong - queryRadius, $lte: thisLong + queryRadius}
				    				}, {"limit":100}, function(err, docs) {
				    					if (err) {
				    						console.log(err);
				    						callback1(); // tell async the task is done
				    					}
				    					step.alerts = docs;
				    					lastAlerts = docs; // store these for next time
				    					console.log('finishing a find...');
				    					callback1(); // tell async the task is done
								    }); // end find
			    				}); // end of push to asyncTasks
		    				} else {
		    					step.alerts = lastAlerts; // don't bother checking
		    				}
		    				lastPair = latLongPair; // update
						});  
		    		});
		    	});
		    });

			async.parallel(asyncTasks, function(){ // run the queries in parallel
			  // All tasks are done now
			  console.log('had to do ' + numQueries + ' queries');
			  console.log('sending back directions');
			  bigCallback(directions);
			});
		}
	});
}


