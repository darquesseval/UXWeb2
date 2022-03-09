var express = require('express');
var app = express();

app.get('/allow-cors', function(request, response) {
    response.set('Access-Control-Allow-Origin', '*');
    response.sendFile(__dirname + '/message.json');
  });

var server = app.listen(process.env.PORT || 'https://experimenting-webux2.herokuapp.com', function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

app.use(express.static('public'));

console.log("My socket server is running")

var socket = require('socket.io');
var io = socket(server);
io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log('new connection: ' + socket.id);

    socket.on('mouse', mouseMsg);

    function mouseMsg(data) {
        socket.broadcast.emit('mouse', data);
        // io.sockets.emit('mouse', data);
        console.log(data);
    }



}
// to start server on heruko:
// heroku git:remote -a "experimenting-webux2"