// define the keys we want all locations to have
var locationSchema = {
	"name":"string",
	"latitude":"string",
	"longitude":"string"
	};

// loop through an array of keys, return false if any of them don't exist
function missingKey(json, schema) {
	var anyMissing = Object.keys(schema).some(function(key) {
		return !json.hasOwnProperty(key);
	});
	return anyMissing;
}

module.exports.validLocation = function(json) {
 	return !missingKey(json, locationSchema);
}

