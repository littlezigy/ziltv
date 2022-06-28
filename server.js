var express = require('express');
var server = express();

// middleware
server.use('/', express.static(__dirname + '/public'));

server.use('/videos/:id', function(req, res) {
    res.sendFile(__dirname + '/public/video_viewer.html');
});

server.use('/template-video-page', function(req, res) {
    res.sendFile(__dirname + '/public/template-video-page.html');
});

// routes
server.use('*', function (req, res) {
    res.sendFile(__dirname + '/public/404.html');
  // serve file
});

var port = 8080;
server.listen(port, function() {
  console.log('server listening on port ' + port);
});
