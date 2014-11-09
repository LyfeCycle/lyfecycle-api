var http = require('http');
var portNum = 3000;

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(portNum, '127.0.0.1');
console.log('Server running at http://127.0.0.1:' + portNum + '/');