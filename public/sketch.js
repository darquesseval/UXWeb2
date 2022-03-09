var socket

function setup() {
createCanvas(windowWidth, windowHeight)
socket = io.connect('https://kind-kowalevski-48d942.netlify.app/public/')
socket.on('mouse', newDrawing);
background(0);
}

function newDrawing(data) {
    noStroke()
    fill(0,255,255);
    ellipse(data.x,data.y,50)
}

function mouseDragged() {
    console.log('Sending: ' + mouseX + ',' + mouseY);

    var data = {
        x: mouseX,
        y: mouseY
    }

    socket.emit('mouse', data);

    fill(255, 0, 255);
    noStroke();
    ellipse(mouseX,mouseY,50);
}

function draw() {

}