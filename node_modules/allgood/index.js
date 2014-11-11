module.exports = {
	valid: function(schema, json) {
		if (!Object.keys(json)) {
			return false;
		}
	 	if (allKeysPresent(schema, json) && allCorrectKeyValues(schema, json)) {
	 		return true;
	 	} else {
	 		return false
	 	}
	}
};

// loop through an array of keys, return false if any of them don't exist
function allKeysPresent(schema, json) {
	var anyMissing = Object.keys(schema).some(function(key) {
		return !json.hasOwnProperty(key);
	});
	return !anyMissing;
}

function allCorrectKeyValues(schema, json) {
	var anyWrongTypes = Object.keys(schema).some(function(key) {
		return !(typeof(json[key]) == schema[key]);
	});
	return !anyWrongTypes;
}