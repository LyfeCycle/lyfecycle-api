allgood
======

Super lightweight JSON model validation for node.js

## Installation

	npm install allgood

## Usage

A validation consists of a JSON object to test and a JSON schema, a definition of the model.

The keys in the schema are the keys you expect to find in the test object, and the values of the schema are the expected types of the test object's corresponding values.

	var allgood = require('allgood')
	  valid = allgood.valid;

	var personSchema = {"name":"string", "age":"number"};
	var newPerson = {name:"Harry Potter", "age":11};
	console.log(valid(personSchema, newPerson));

## Tests

  npm test
