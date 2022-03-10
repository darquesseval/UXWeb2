var socket
let engine
let world
let bottomB, topB, leftB, rightB

let connection


let pointer = []
let i = 0

let x = windowWidth/2;
let y = windowHeight/2;

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
    bottomB = new Bound(0, windowHeight / 2, windowWidth, 10, 0);
    topB = new Bound(windowWidth / 2, 0, windowWidth, 10, 0);
    leftB = new Bound(0, windowHeight / 2, 10, windowHeight, 1.5708);
    rightB = new Bound(windowWidth, windowHeight / 2, 10, windowHeight, 1.5708);
}


function draw() {
    Matter.Engine.update(engine);
    bottomB.show(0, 100, 200, 255);
    topB.show(0, 100, 200, 255);
    leftB.show(0, 100, 200, 255);
    rightB.show(0, 100, 200, 255);
   
    push()
    translate(windowWidth / 2, windowHeight / 2)
     
 let p1 = new Circle(windowWidth/2, windowHeight/5*3, 10)
 let p2 = new Circle(x, y, 10)

 connection = Matter.Constraint.create({
     bodyA: p1.body,
     bodyB: p2.body,
     length: windowHeight/5,
     stiffness: 0.2
 })
 pop()

    p1.show(255);
    p2.show(255);

    // if (pointer.length >= 1) {
    //     for (let n = 0; n < pointer.length; n++) {
    //         pointer[n].show(255, 0, 0, 255)
    //     }
    // }
}

function newDot(dataSmartphone) {
    x = dataSmartphone.angle1;
    y = dataSmartphone.angle2;
    // fill(255,0,0);
    // ellipse(dataSmartphone.angle1, dataSmartphone.angle2, 10);

    // pointer[i] = new Circle(dataSmartphone.angle1, dataSmartphone.angle2, 20);
    // i++

    console.log('received: ' + dataSmartphone)
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