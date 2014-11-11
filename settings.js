var secrets = require('./secrets');

module.exports.portNum = process.env.PORT || 3000;
module.exports.mongoPort = 27017;
//module.exports.mongoURI = (process.env.MONGOLAB_URI ? ('mongodb://' + secrets.dbUser + ':' + secrets.dbPassword + '@ds051630.mongolab.com:51630') :  ('localhost:' + module.exports.mongoPort));
module.exports.mongoURI = (process.env.MONGOLAB_URI ||  ('localhost:' + module.exports.mongoPort));

