var should = require('chai').should(),
    scapegoat = require('../index'),
    valid = scapegoat.valid;

describe('#validate', function() {
  it('validates Harry Potter', function() {
    var personSchema = {"name":"string", "age":"number"};
    var newPerson = {name:"Harry Potter", "age":11};
    valid(personSchema, newPerson).should.equal(true);
  });

  it('validates a correct simple schema', function() {
    var schema = {"name":"string"};
    var json = {name:"Tester"};
    valid(schema, json).should.equal(true);
  });

  it('validates a correct simple schema', function() {
    var schema = {"name":"string", "age":"number"};
    var json = {name:"Tester", age:100};
    valid(schema, json).should.equal(true);
  });

  it('does not validates an incorrect simple schema', function() {
    var schema = {"name":"string"};
    var json = {name:123};
    valid(schema, json).should.equal(false);
  });

  it('does not validates a schema with a missing parameter', function() {
    var schema = {"name":"string", "age":"number"};
    var json = {name:123};
    valid(schema, json).should.equal(false);
  });

  it('validates an empty  schema', function() {
    var schema = {};
    var json = {name:123};
    valid(schema, json).should.equal(true);
  });
});