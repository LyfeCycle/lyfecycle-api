
module.exports.portNum = process.env.PORT || 3000;
module.exports.mongoPort = 27017;
module.exports.mongoURI = (process.env.MONGOLAB_URI ? ('mongodb://' + process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@ds051630.mongolab.com:51630/heroku_app31452963') :  ('localhost:' + module.exports.mongoPort + '/lyfecycle'));
// google API
module.exports.googleDirectionsStartReq = 'https://maps.googleapis.com/maps/api/directions';
module.exports.googleDirectionsEndReq = '&key=' + APIConstants.GoogleDirectionsKey + '&avoid=highways&mode=bicycling&sensor=false';