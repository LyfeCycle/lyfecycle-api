Lyfecycle's API
=============

Currently: get/post/put location data

Localhost Setup
=============

- [Install MongoDB](http://docs.mongodb.org/manual/installation/)
- Start a local MongoDB server by running `mongod`
- Start a local node server by running `node lyfecycle-api.js` from inside the project root

Curl Requests
=============

##Locations

###List all locations:
	curl -i -X GET http://127.0.0.1:3000/all-locations

###Get location by _id:
	curl -i -X GET -H 'Content-Type: application/json' -d '{"locationId" : "123"}' http://127.0.0.1:3000/locations

###Add a new location:
	curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "New Location", "latitude": "12.34", "longitude": "56.78"}' http://127.0.0.1:3000/locations

##Users

###List all users:
	curl -i -X GET http://127.0.0.1:3000/users

###Get user by _id:
	curl -i -X GET -H 'Content-Type: application/json' -d '{"userId" : "123"}' http://127.0.0.1:3000/users

###Add a new user:
	curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "New User", "homeLatitude": "12.34", "homeLongitude": "56.78"}' http://127.0.0.1:3000/users

###Change a user's mileage
	curl -i -X POST -H 'Content-Type: application/json' -d '{"userId": "123", "miles": "100.25}' http://127.0.0.1:3000/users/change-mileage