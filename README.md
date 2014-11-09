lyfecycle-api
=============

###List all locations:
	curl -i -X GET http://localhost:3000/locations

### Get location by _id:
	curl -i -X GET http://localhost:3000/locations/12345

###Delete location by _id:
	curl -i -X DELETE http://localhost:3000/locations/12345

###Add a new location:
	curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "New Location", "latitude": "12.34", "longitude": "56.78"}' http://localhost:3000/locations

###Modify location by _id:
	curl -i -X PUT -H 'Content-Type: application/json' -d '{"name": "New Location", "latitude": "12.345"}' http://localhost:3000/locations/12345