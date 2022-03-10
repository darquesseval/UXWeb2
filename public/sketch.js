var socket
let engine
let world
let bottomB, topB, leftB, rightB

let pointer = []
let i = 0


function setup() {
    frameRate(30)
    createCanvas(windowWidth, windowHeight)
    socket = io.connect('https://experimenting-webux2.herokuapp.com')
    socket.on('mouse', newDrawing);
    socket.on('angle', newDot);
    background(0);
    engine = Matter.Engine.create();
    world = engine.world;
    rectMode(CENTER);
bottomB = new Bound(0,windowHeight/2,windowWidth, 10);
topB = new Bound(windowWidth/2,0,windowWidth,10);
leftB = new Bound(0,windowHeight/2,10,windowHeight,1.5708);
rightB = new Bound(windowWidth,windowHeight/2,10,windowHeight,1.5708);
}


function draw() {
    Matter.Engine.update(engine);
    bottomB.show(0,100,200,255);
    topB.show(0,100,200,255);
    leftB.show(0,100,200,255);
    rightB.show(0,100,200,255);
    if(pointer.length >=1) {
    for(let n = 0; n<pointer.length;n++){
        pointer[n].show(255, 0, 0, 255)
    }
}
}

function newDot(dataSmartphone) {
    push()
    translate(windowWidth / 2, windowHeight / 2)

    // fill(255,0,0);
    // ellipse(dataSmartphone.angle1, dataSmartphone.angle2, 10);

    pointer[i] = new Circle(dataSmartphone.angle1, dataSmartphone.angle2, 20);
    
    pop()
    i++
    console.log('received: ' + dataSmartphone)
    console.log(i)
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

class Bound {
    constructor(x, y, w, h, rotation) {
      this.body = Matter.Bodies.rectangle(x, y, w, h, {
        //these bodies do not move
        isStatic: true,
      });
      Matter.Body.rotate(this.body, rotation);
      Matter.World.add(world, this.body);
      this.w = w;
      this.h = h;
    }
  
    //draw the body
    show(colorR, colorG, colorB, colorO) {
      rectMode(CENTER);
      const pos = this.body.position;
      const angle = this.body.angle;
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      fill(colorR, colorG, colorB, colorO);
      strokeWeight(3);
      rect(0, 0, this.w, this.h, 5);
      pop();
    }
  }


function newDrawing(data) {
    noStroke()
    fill(0, 255, 255);
    ellipse(data.x, data.y, 50)
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
    ellipse(mouseX, mouseY, 50);
}