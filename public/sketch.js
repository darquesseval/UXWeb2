var socket
let engine
let world

function setup() {
createCanvas(windowWidth, windowHeight)
socket = io.connect('https://experimenting-webux2.herokuapp.com')
socket.on('mouse', newDrawing);
socket.on('angle', newDot);
background(0);
engine = Matter.Engine.create();
world = engine.world;
}

function newDot(dataSmartphone) {
    push()
translate(windowWidth/2, windowHeight/2)

// fill(255,0,0);
// ellipse(dataSmartphone.angle1, dataSmartphone.angle2, 10);

let pointer = new Circle(dataSmartphone.angle1, dataSmartphone.angle2, 20);
pointer.show(255,0,0,100)
pop()

    console.log('received: ' + dataSmartphone)
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
    Matter.Engine.update(engine);

}

// code from kickprog project
class Circle {
    constructor(x, y, r) {
      this.body = Matter.Bodies.circle(x, y, r, {
        //make physics a bit more sand-like
        restitution: 0.35,
        density: 1,
        friction: 0.5,
      });
      Matter.World.add(world, this.body);
      this.r = r;
    }
  
    //draw the body
    show(colorR, colorG, colorB, colorO) {
      const pos = this.body.position;
      const angle = this.body.angle;
      noStroke();
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      fill(colorR, colorG, colorB, colorO)
      noStroke();
      ellipse(0, 0, this.r * 2)
      pop();
    }
  
  }