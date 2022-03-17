var socket
let engine
let world
let render

let connection
let circleChain

let img1, img2

let gap;
let posX;
let posY;

let bg, bg_stunned, bell, tentacle, arm, mouth;

let fix1, fix2;
let arm1, tentacle1;
let bellPhysics, bellH, bellW;

function preload() {
    bg = loadImage('https://rocky-fjord-59052.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/background.jpeg');
    bg_stunned = loadImage('https://rocky-fjord-59052.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/background_stunned.jpeg');
    bell = loadImage('https://rocky-fjord-59052.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/bell.png');
    tentacle = loadImage('https://rocky-fjord-59052.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/tentacle.png');
    arm = loadImage('https://rocky-fjord-59052.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/stinging_arm_round.png');
    mouth = loadImage('https://rocky-fjord-59052.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/mouth.png');
}


function setup() {
    frameRate(30)
    createCanvas(windowWidth, windowHeight)
    socket = io.connect('https://experimenting-webux2.herokuapp.com')
    socket.on('forArm', stingingArms);
    socket.on('forTentacle', tentaclesTurn);
    // socket.on('mouse', newDrawing);
    background(0);
    engine = Matter.Engine.create();
    world = engine.world;
    posX = windowWidth / 2;
    posY = windowWidth * 0.15;
    bellW = windowWidth / 5;
    bellH = windowWidth / 9;
    gap = windowWidth / 10
    // render = Matter.Render.create({
    //     element: document.body,
    //     engine: engine,
    //     options: {
    //         width: windowWidth,$$£
    //         height: windowHeight,
    //         wireframes: false
    //     }
    // });
    rectMode(CENTER);
    // angleMode(DEGREES);
    world.gravity.y = 0.1;
    arm1 = new Rope(posX + windowWidth / 15, posY - windowWidth / 30, windowWidth / gap, 8, img1, fix1)
    tentacle1 = new Rope(posX + windowWidth / 20, posY - windowWidth / 30, windowWidth / gap / 8, 60, img2, fix2)
    bellPhysics = Matter.Bodies.trapezoid(posX, posY - bellH / 2, bellW, bellH, 1, {
        isStatic: true
    })

    Matter.World.add(world, bellPhysics);
    world.gravity.y = 0.5
}


function draw() {
    Matter.Engine.update(engine);
    background(0)

    arm1.showArm();
    tentacle1.showTentacle();

    // arm1.show(255,255,255,255);


    //bell?
    //matter triangle:
    // beginShape()
    // vertex(bellPhysics.vertices[0].x, bellPhysics.vertices[0].y);
    // vertex(bellPhysics.vertices[1].x, bellPhysics.vertices[1].y);
    // vertex(bellPhysics.vertices[2].x,bellPhysics.vertices[2].y);
    // endShape()

    push()
    angleMode(RADIANS);
    translate(bellPhysics.position.x, bellPhysics.position.y);
    rotate(bellPhysics.angle);
    image(bell, 0 - bellW / 2, 0 - bellH * 0.6, bellW, bellH);
    pop()

    console.log(bellPhysics)

}

function stingingArms(dataSmartphone) {
    arm1.body.bodies[arm1.n - 1].position.x = windowWidth / 2 + dataSmartphone.angle1;
    arm1.body.bodies[arm1.n - 1].position.y = windowHeight / 2 + dataSmartphone.angle2;

}

function tentaclesTurn(dataSmartphone) {
    angleMode(DEGREES);
    tentacle1.body.bodies[this.n - 1].position.x = windowWidth / 2 + dataSmartphone.angle1;
    tentacle1.body.bodies[this.n - 1].position.y = windowHeight / 2 + dataSmartphone.angle2;

    angleMode(RADIANS);
        let rotationAngle = Math.atan2(dataSmartphone.angle1 - bellPhysics.position.x, - (dataSmartphone.angle2 - (bellPhysics.position.y+bellH/2) ))*(180 / Math.PI);      
        angleMode(DEGREES);
        rotate(rotationAngle)
}


class Rope {
    constructor(ropeX, ropeY, r, n, imgPos, connectionName) {
        this.r = r;
        this.x = ropeX;
        this.y = ropeY;
        this.n = n;
        this.imgPos = imgPos;
        this.cN = connectionName;
        this.body = Matter.Composites.stack(this.x, this.y, 1, this.n, 0, this.r / 5, function (x, y) {
            return Matter.Bodies.circle(x, y, r * 2, {
                restitution: 0.9,
                density: 1,
                friction: 0.5,
            });
        })
        Matter.Composites.chain(this.body, 0, 0, 0, 0, {
            stiffness: 1,
            length: this.r * 4
        });
        Matter.Composite.add(this.body, this.cN = Matter.Constraint.create({
            bodyB: this.body.bodies[0],
            pointB: {
                x: 0,
                y: this.r * -1
            },
            pointA: {
                x: this.body.bodies[0].position.x,
                y: this.body.bodies[0].position.y
            },
            stiffness: 1
        }));
        Matter.Composite.add(world, [
            this.body //,
            // this.fPN = Matter.Bodies.rectangle(this.x+this.r, this.y+this.r/2, this.r*2, this.r, {
            //     isStatic: true
            // })
        ]);

    }

    show(colorR, colorG, colorB, opacity) {
        this.red = colorR;
        this.green = colorG;
        this.blue = colorB;
        this.o = opacity;
        fill(this.red, this.green, this.blue, this.o);
        for (let f = 0; f < this.n; f++) {
            push();
            angleMode(DEGREES);
            translate(this.body.bodies[f].position.x, this.body.bodies[f].position.y);
            rotate(this.body.bodies[f].angle);
            ellipse(0, 0, this.body.bodies[f].circleRadius)
            pop();

            if (f > 0) {
                stroke(this.red, this.green, this.blue);
                line(this.body.bodies[f - 1].position.x, this.body.bodies[f - 1].position.y, this.body.bodies[f].position.x, this.body.bodies[f].position.y);
            }
        }

        // push()
        // translate(this.fPN.bounds.min.x+(this.fPN.bounds.max.x - this.fPN.bounds.min.x)/2, this.fPN.bounds.min.y+(this.fPN.bounds.max.y - this.fPN.bounds.min.y)/2);
        //     rotate(this.fPN.angle);
        //     fill(0,0,255,255)
        // rect(0, 0, this.fPN.bounds.max.x - this.fPN.bounds.min.x, this.fPN.bounds.max.y - this.fPN.bounds.min.y);
        // pop()
        line(this.cN.pointA.x, this.cN.pointA.y, this.body.bodies[0].position.x, this.body.bodies[0].position.y);
    }

    showTentacle() {
        for (let f = 0; f < this.n; f++) {
            push();
            angleMode(DEGREES);
            // translate(this.body.bodies[f].bounds.min.x-this.r, this.body.bodies[f].bounds.min.y);
            translate(this.body.bodies[f].position.x, this.body.bodies[f].position.y);
            rotate(this.body.bodies[f].angle);
            fill(255, 0, 0, 0);
            noStroke();
            this.imgPos = ellipse(0, 0, this.body.bodies[f].circleRadius);
            console.log(this.imgPos);
            image(tentacle, this.imgPos.body.x, this.imgPos.body.y, this.body.bodies[f].circleRadius * 3, this.body.bodies[f].circleRadius * 3.5);
            pop();

            if (f > 0) {
                stroke(255);

                line(this.body.bodies[f - 1].position.x, this.body.bodies[f - 1].position.y, this.body.bodies[f].position.x, this.body.bodies[f].position.y);
            }
        }

        // push()
        // translate(this.fPN.bounds.min.x+(this.fPN.bounds.max.x - this.fPN.bounds.min.x)/2, this.fPN.bounds.min.y+(this.fPN.bounds.max.y - this.fPN.bounds.min.y)/2);
        //     rotate(this.fPN.angle);
        //     fill(0,0,255,255)
        // rect(0, 0, this.fPN.bounds.max.x - this.fPN.bounds.min.x, this.fPN.bounds.max.y - this.fPN.bounds.min.y);
        // pop()
        line(this.cN.pointA.x, this.cN.pointA.y, this.body.bodies[0].position.x, this.body.bodies[0].position.y);
    }
    showArm() {
        for (let f = 0; f < this.n; f++) {
            push();
            angleMode(DEGREES);
            // translate(this.body.bodies[f].bounds.min.x+this.body.bodies[f].circleRadius*1.5, this.body.bodies[f].bounds.min.y+this.body.bodies[f].circleRadius*0.5);
            translate(this.body.bodies[f].position.x, this.body.bodies[f].position.y);
            rotate(this.body.bodies[f].angle + 90);
            fill(255, 0, 0, 0);
            noStroke();
            this.imgPos = ellipse(0, 0, this.body.bodies[f].circleRadius)
            image(arm, this.imgPos.x, this.imgPos.y, this.body.bodies[f].circleRadius * 1.2, this.body.bodies[f].circleRadius * 1.2)
            pop();

            if (f > 0) {
                stroke(55, 255, 0)

                line(this.body.bodies[f - 1].position.x, this.body.bodies[f - 1].position.y, this.body.bodies[f].position.x, this.body.bodies[f].position.y);
            }
        }

        // push()
        // translate(this.fPN.bounds.min.x+(this.fPN.bounds.max.x - this.fPN.bounds.min.x)/2, this.fPN.bounds.min.y+(this.fPN.bounds.max.y - this.fPN.bounds.min.y)/2);
        //     rotate(this.fPN.angle);
        //     fill(0,0,255,255)
        // rect(0, 0, this.fPN.bounds.max.x - this.fPN.bounds.min.x, this.fPN.bounds.max.y - this.fPN.bounds.min.y);
        // pop()

        line(this.cN.pointA.x, this.cN.pointA.y, this.body.bodies[0].position.x, this.body.bodies[0].position.y);
    }

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////
    //from here on down adjust for Smartphone

}




// function newDot(dataSmartphone) {
//     x = windowWidth/2 + dataSmartphone.angle1;
//     y = windowHeight/2 + dataSmartphone.angle2;
//     // fill(255,0,0);
//     // ellipse(dataSmartphone.angle1, dataSmartphone.angle2, 10);

//     // pointer[i] = new Circle(dataSmartphone.angle1, dataSmartphone.angle2, 20);
//     // i++

//     console.log('received: ' + dataSmartphone)
// }


// function mouseDragged() {
//     console.log('Sending: ' + mouseX + ',' + mouseY);

//     var data = {
//         x: mouseX,
//         y: mouseY
//     }

//     socket.emit('mouse', data);

//     fill(255, 0, 255);
//     noStroke();
//     ellipse(mouseX, mouseY, 50);
// }