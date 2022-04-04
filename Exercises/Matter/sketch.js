// const fill = require("fill-range")

let engine
let world
let render

let connection
let circleChain

let fixPoint1, fixPoint2

let gap = 120;
let posX;
let posY;

let bg, bg_stunned, bell, tentacle, arm, mouth;

let fix1, fix2;
let arm1, tentacle1;
let bellPhysics, bellH, bellW;

let x = 80;
let negcount = false;

function preload() {
    bg = loadImage('Pic/background.jpeg');
    bg_stunned = loadImage('Pic/background_stunned.jpeg');
    bell = loadImage('Pic/bell.png');
    tentacle = loadImage('Pic/tentacle.png');
    arm = loadImage('Pic/stinging_arm_round.png');
    mouth = loadImage('Pic/Mouth.png');
}

function setup() {
    frameRate(30)
    createCanvas(windowWidth, windowHeight)
    background(0);
    engine = Matter.Engine.create();
    world = engine.world;
    posX = windowWidth / 2;
    posY = windowWidth * 0.1;
    bellW = windowWidth / 5;
    bellH = windowWidth / 9;
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
    arm1 = new Rope(posX + windowWidth / 15, posY - windowWidth / 30, windowWidth / gap, 8, fixPoint1, fix1)
    tentacle1 = new Rope(posX + windowWidth / 20, posY - windowWidth / 30, windowWidth / gap / 8, 60, fixPoint2, fix2)
    bellPhysics = Matter.Bodies.trapezoid(posX, posY - bellH / 2, bellW, bellH, 1, {
        isStatic: true
    })

    Matter.World.add(world, bellPhysics);
    world.gravity.y = 0.5
}


function draw() {
    Matter.Engine.update(engine);
    background(0)

    for (let countx = x-50; countx <= x;countx++) {
        push()
        fill(255, 0, 255, 10);
        noStroke()
        ellipse(posX - windowWidth / 40 * 2, posY - windowWidth / 60, countx, countx * 2);
        pop()
    }

    if (x == 120) {
        negcount = true;
    } else if (x == 80) {
        negcount = false;
    }
    if (negcount == false) {
        x++
    } else {
        x = x-1
    }

    image(mouth, posX - windowWidth / 40 * 2, posY - windowWidth / 60, windowWidth / 40 * 4, windowWidth / 40 * 6.5)
    arm1.showArm();
    tentacle1.showTentacle();

    arm1.show(255, 255, 255, 255);
    arm1.stingingArms();


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




class Rope {
    constructor(ropeX, ropeY, r, n, fixPointName, connectionName) {
        this.r = r;
        this.x = ropeX;
        this.y = ropeY;
        this.n = n;
        this.fPN = fixPointName;
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
            imageMode(CENTER);
            translate(this.body.bodies[f].position.x, this.body.bodies[f].position.y)
            rotate(this.body.bodies[f].angle);
            fill(255, 255, 0, 255)
            this.fPN = ellipse(0, 0, this.body.bodies[f].circleRadius)
            image(tentacle, 0, 0, 10, 10)
            pop();

            if (f > 0) {
                stroke(255)

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
            translate(this.body.bodies[f].position.x + this.r, this.body.bodies[f].position.y - this.r)
            rotate(this.body.bodies[f].angle + 90);
            this.fPN = ellipse(0, 0, this.body.bodies[f].circleRadius)
            image(arm, this.fPN.x, this.fPN.y, this.body.bodies[f].circleRadius * 1.2, this.body.bodies[f].circleRadius * 1.2)
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

    stingingArms() {
        if (keyIsDown(65)) { //press letter a
            this.body.bodies[this.n - 1].position.x = mouseX;
            this.body.bodies[this.n - 1].position.y = mouseY;
        }
    }

    tentacles() {
        if (keyIsDown(83)) { //press letter s
            angleMode(DEGREES);
            this.body.bodies[this.n - 1].position.x = mouseX;
            this.body.bodies[this.n - 1].position.y = mouseY;
            // this.body.angle = mouseX/-360*100
            bellPhysics.angle = mouseX / -360 * 10
        }
    }

}