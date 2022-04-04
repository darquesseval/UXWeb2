var express = require('express');
var app = express();

app.get('/allow-cors', function(request, response) {
    response.set('Access-Control-Allow-Origin', '*');
    response.sendFile(__dirname + '/message.json');
  });

var server = app.listen(process.env.PORT || 'https://experimenting-webux2.herokuapp.com' || 'https://experimenting-webux2.herokuapp.com/controller.html', function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

app.use(express.static('public'));

console.log("My socket server is running")

var socket = require('socket.io');
var io = socket(server);
io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log('new connection: ' + socket.id);

    socket.on('forArm', armMsg);
    socket.on('forArmStop', armStopMsg);
    socket.on('forTentacle', tentacleMsg);
    socket.on('forMouth', mouthMsg);
    socket.on('forMouthStop', mouthStopMsg);
    socket.on('forRight', rightMsg);
    socket.on('forRightStop', rightStopMsg);
    socket.on('forLeft', leftMsg);
    socket.on('forLeftStop', leftStopMsg);

    function armMsg(dataSmartphone) {
      socket.broadcast.emit('forArm', dataSmartphone)
      console.log(dataSmartphone);
    }
    function armStopMsg(dataSmartphone) {
      socket.broadcast.emit('forArmStop', dataSmartphone);
      console.log(dataSmartphone);
      
    }
    function tentacleMsg(dataSmartphone) {
        socket.broadcast.emit('forTentacle', dataSmartphone);
        console.log(dataSmartphone);
    }
    function mouthMsg(dataSmartphone) {
      socket.broadcast.emit('forMouth', dataSmartphone);
      console.log(dataSmartphone);
  }
  function mouthStopMsg(dataSmartphone) {
    socket.broadcast.emit('forMouthStop', dataSmartphone);
    console.log(dataSmartphone);
}
function rightMsg(dataSmartphone) {
  socket.broadcast.emit('forRight', dataSmartphone);
  console.log(dataSmartphone);
}
function rightStopMsg(dataSmartphone) {
  socket.broadcast.emit('forRightStop', dataSmartphone);
  console.log(dataSmartphone);
}
function leftMsg(dataSmartphone) {
  socket.broadcast.emit('forLeft', dataSmartphone);
  console.log(dataSmartphone);
}
function leftStopMsg(dataSmartphone) {
  socket.broadcast.emit('forLeftStop', dataSmartphone);
  console.log(dataSmartphone);
}

  


}
// to start server on heruko:
// heroku git:remote -a "experimenting-webux2"