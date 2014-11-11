var secrets = require('./secrets');

module.exports.portNum = process.env.PORT || 3000;
module.exports.mongoPort = 27017;
module.exports.mongoURI = (process.env.MONGOLAB_URI ? ('mongodb://' + secrets.dbUser + ':' + secrets.dbPassword + '@ds051630.mongolab.com:51630/heroku_app31452963') :  ('localhost:' + module.exports.mongoPort + '/locations'));
//module.exports.mongoURI = (process.env.MONGOLAB_URI || ('localhost:' + module.exports.mongoPort));

