var express = require('express');
var server = express();

// middleware
server.use('/test', express.static(__dirname + '/tests'));
server.use('/tests', express.static(__dirname + '/tests'));
server.use('/', express.static(__dirname + '/public'));

// routes
server.use('*', function (req, res) {
    res.sendFile(__dirname + '/tests/404.html');
});

var port = 8081;
server.listen(port, function() {
  console.log('server listening on port ' + port);
});
