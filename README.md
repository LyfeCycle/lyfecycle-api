Lyfecycle's API
=============

Localhost Setup
=============

- [Install MongoDB](http://docs.mongodb.org/manual/installation/)
- Install node modules by running `npm install`
- Start a local MongoDB server by running `mongod`
- Save a copy of .env.example as .env and set your config variables
- Start a local node server by running `foreman start` from inside the project root

Curl Requests
=============

##Locations

####Getting directions:

Pass a startLat (starting latitude), startLong (starting longitude), and destination (as a string)

	curl -i -X GET http://127.0.0.1:3000/locations/directions -d '{"startLat":42.34, "startLong":-70.9,"destination":"kenmore"}' -H 'Content-Type: application/json'

This contains Google's API return. Each route.leg.step of the return contains an array `alerts`, which contains any corresponding danger points.

####Add a new location:

A location is a danger point, bike rack, bus stop, etc. A location has a name, latitude, longitude, and a tag which classifies it as one of the above types of locations. 

The current accepted tags are: 'busStop', 'crash', 'bikeRack', 'dangerPoint', 'dooring', 'traffic', 'trafficAccident', 'construction', 'blockedBikeLane'

Takes an array of locations.

    curl -i -X POST -H 'Content-Type: application/json' -d '[{"name": "New Location", "latitude": 12.34, "longitude": 56.78, "tag": "crash"}]' http://127.0.0.1:3000/locations

####List all locations:
	curl -i -X GET http://127.0.0.1:3000/locations

####Locations within a region:

A region is a square defined by 2 opposite points. Define these two points with a `topLeftLat`, `topLeftLong`, `botRightLat`, and `botRightLong`.

	curl -i -X GET -H 'Content-Type: application/json' -d '{"topLeftLat" : 42.1, "topLeftLong" : 42.1, "botRightLat" : 42.1, "botRightLong" : 42.1}' http://127.0.0.1:3000/locations

####Get location by _id:
	curl -i -X GET -H 'Content-Type: application/json' -d '{"locationId" : "123"}' http://127.0.0.1:3000/locations/id

####Get locations by tag

Look up all locations with a desired tag.

	curl -i -X GET -H 'Content-Type: application/json' -d '{"tag": "crash"}' http://127.0.0.1:3000/locations/tagged

##Users

####Add a new user:

Create a new user with a name, a unique Facebook ID string, and a neighborhood like 'Fenway' or 'Allston'. A user is also initialized with a counter for how many miles they've ridden.

	curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "New User", "facebookId": "ABC1234", "neighborhoodName": "Fenway"}' http://127.0.0.1:3000/users

####List all users:

	curl -i -X GET http://127.0.0.1:3000/users

####Get user by _id:

	curl -i -X GET -H 'Content-Type: application/json' -d '{"userId" : "123"}' http://127.0.0.1:3000/users/find

####Get user by Facebook ID:

Same endpoint as finding by _id, but pass a different parameter

	curl -i -X GET -H 'Content-Type: application/json' -d '{"facebookId" : "abc123"}' http://127.0.0.1:3000/users/find

You can also find a user by Facebook ID by passing it as a parameter in the url:

	curl -i -X GET http://127.0.0.1:3000/users/find?facebookId=abc123

####Change a user's mileage

Increment how many miles a user has ridden. The `miles` parameter can be positive or negative and is added to the user's current mileage count.

	curl -i -X POST -H 'Content-Type: application/json' -d '{"userId": "123", "miles": "100.25}' http://127.0.0.1:3000/users/change-mileage
