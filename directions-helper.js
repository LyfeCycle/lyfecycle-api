var request = require('request');

module.exports.init = function(context, callback) {
    module.context = context;
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
	    // loop through json, enter an example warning for each route
	    directions.routes.forEach(function(route) {
	    	route.legs.forEach(function(leg) {
	    		leg.steps.forEach(function(step) {
	    			step.alerts = { name: 'Boston Crash Point',
									latitude: '42.3565195',
									longitude: '-71.13808',
									tag: 'crash',
									_id: '54ea271e41a519295e000028' }
	    		});
	    	});
	    });
	  } else {
	  	directions = error;
	  }
	  callback(directions);
	});
}

