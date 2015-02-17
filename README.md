Lyfecycle's API
=============

Localhost Setup
=============

- [Install MongoDB](http://docs.mongodb.org/manual/installation/)
- Install node modules by running `npm install`
- Start a local MongoDB server by running `mongod`
- Start a local node server by running `node lyfecycle-api.js` from inside the project root

Curl Requests
=============

##Locations

####Add a new location:

A location is a danger point, bike rack, bus stop, etc. A location has a name, latitude, longitude, and a tag which classifies it as one of the above types of locations. 

The current accepted tags are: busStop, crash, bikeRack, dangerPoint

    curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "New Location", "latitude": "12.34", "longitude": "56.78", "tag": "crash"}' http://127.0.0.1:3000/locations

####List all locations:
	curl -i -X GET http://127.0.0.1:3000/locations

####Get location by _id:
	curl -i -X GET -H 'Content-Type: application/json' -d '{"locationId" : "123"}' http://127.0.0.1:3000/locations/id

####Get locations by tag

Look up all locations with a desired tag.

	curl -i -X GET -H 'Content-Type: application/json' -d '{"tag": "crash"}' http://127.0.0.1:3000/locations/tagged

##Users

####Add a new user:

Create a new user with a name, and a home latitude and longitude. These coordinates will be used to determine local leaderboards. A user is also initialized with a counter for how many miles they've ridden.

	curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "New User", "homeLatitude": "12.34", "homeLongitude": "56.78"}' http://127.0.0.1:3000/users

####List all users:
	curl -i -X GET http://127.0.0.1:3000/users

####Get user by _id:
	curl -i -X GET -H 'Content-Type: application/json' -d '{"userId" : "123"}' http://127.0.0.1:3000/users

####Change a user's mileage

Increment how many miles a user has ridden. The `miles` parameter can be positive or negative and is added to the user's current mileage count.

	curl -i -X POST -H 'Content-Type: application/json' -d '{"userId": "123", "miles": "100.25}' http://127.0.0.1:3000/users/change-mileage