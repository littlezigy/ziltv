var express = require('express');
var server = express();

// middleware
server.use('/', express.static(__dirname + '/public'));

server.use('/videos/:id', function(req, res) {
    res.sendFile(__dirname + '/public/video_viewer.html');
});

server.use('/login', function(req, res) {
    res.sendFile(__dirname + '/public/login.html');
});

server.use('/dashboard', function(req, res) {
    res.sendFile(__dirname + '/public/creatorDashboard.html');
});

server.use('/upload', function(req, res) {
    res.sendFile(__dirname + '/public/creatorDashboard.html');
});

server.use('/channel', function(req, res) {
    res.sendFile(__dirname + '/public/creatorDashboard.html');
});

server.use('/profile', function(req, res) {
    res.sendFile(__dirname + '/public/profile.html');
});

server.use('/profile/:id', function(req, res) {
    res.sendFile(__dirname + '/public/profile.html');
});

server.use('/template-video-page', function(req, res) {
    res.sendFile(__dirname + '/public/template-video-page.html');
});

// routes
server.use('*', function (req, res) {
    res.sendFile(__dirname + '/public/404.html');
  // serve file
});

var port = 3075;
server.listen(port, function() {
  console.log('server listening on port ' + port);
});
