var http = require('http');

module.exports.init = function(context, callback) {
    module.context = context;
    callback(null);
}

// helper function to get directions
module.exports.getDirections = function(startLat, startLong, destination) {
	var directions; // the json obj we'll eventuall return

	// build the url for our http request
	requestPath = "origin="
				+ startLat + ',' 
				+ startLong 
				+ '&destination=' 
				+ destination 
				+ context.settings.googleDirectionsEndReq;

	var options = {
	  host: context.settings.googleDirectionsStartReq,
	  path: '/json?' + requestPath
	};

	buildDirectionsObj = function(response) {
	  var str = '';

	  response.on('data', function (chunk) {
	    str += chunk; // build the string with each chunk of data we get back
	  });

	  response.on('end', function () {
	    var json = JSON.parse(str);
	    directions = json;
	    console.log(json);
	  });
	}

	var req = http.request(options, buildDirectionsObj);
	req.end();

	return directions;
}

