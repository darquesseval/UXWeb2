var socket

function setup() {
createCanvas(windowWidth, windowHeight)
socket = io.connect('https://experimenting-webux2.herokuapp.com')
socket.on('mouse', newDrawing);
socket.on('angle', newDot);
background(0);
}

function newDot(dataSmartphone) {
    push()
translate(windowWidth/2, windowHeight/2)
ellipse(dataSmartphone.angle1*10, dataSmartphone.angle2*10, 100)
    pop()
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