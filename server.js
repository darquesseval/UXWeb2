var express = require('express');
var app = express();
var server = app.listen('https://kind-kowalevski-48d942.netlify.app/exercises/Smartphone_Sensor/public/');

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
        io.sockets.emit('mouse', data);
        console.log(data);
    }



}