
// loop through an array of keys, return false if any of them don't exist
function allKeysPresent(json, schema) {
	var anyMissing = Object.keys(schema).some(function(key) {
		return !json.hasOwnProperty(key);
	});
	return !anyMissing;
}

function allCorrectKeyValues(json, schema) {
	var anyWrongTypes = Object.keys(schema).some(function(key) {
		return !(typeof(json[key]) == schema[key]);
	});
	return !anyWrongTypes;
}

module.exports.validLocation = function(json, schema) {
 	//return !missingKey(json, locationSchema);
 	if (allKeysPresent(json, schema) && allCorrectKeyValues(json, schema)) {
 		return true;
 	} else {
 		console.log('Invalid! JSON did not match schema: ' + JSON.stringify(schema));
 	}
}

