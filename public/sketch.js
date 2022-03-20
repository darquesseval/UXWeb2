var socket
let engine
let world
let render

let connection
let circleChain

let gap;
let posX;
let posY;
let armY, tentacleY;

let bg, bg_stunned, bell, tentacle, arm, mouth;

let fix1, fix2, fix3, fix4, fix5, fix6, fix7, fix8, fix9, fix10, fix11;
let arm1, tentacle1, arm2, tentacle2, arm3, tentacle3, arm4, tentacle4, arm5, tentacle5, tentacle6;
let arm1x, tentacle1x, arm2x, tentacle2x, arm3x, tentacle3x, arm4x, tentacle4x, arm5x, tentacle5x, tentacle6x;
let bellPhysics, bellH, bellW;
let armGap, tentacleGap;

let x = 80;
let negcount = false;

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
    posY = windowWidth*0.3;
    tentacleY = posY-windowWidth/70;
    armY = posY-windowWidth/50;
    bellW = windowWidth/13*2;
    bellH = windowWidth/10;
    gap = windowWidth/10
    armGap = windowWidth / gap;
    tentacleGap = windowWidth / gap/8;
    
    arm1x = -windowWidth/40*2
    arm2x = -windowWidth/40*1
    arm3x = 0
    arm4x = +windowWidth/40*1
    arm5x = +windowWidth/40*2.25

    tentacle1x = -windowWidth/40*2
    tentacle2x = -windowWidth/40*1
    tentacle3x = -0
    tentacle4x = +windowWidth/40*1
    tentacle5x = +windowWidth/40*2
    tentacle6x = +windowWidth/40*3



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
    world.gravity.y = 0;
    arm1 = new Rope(posX+arm1x, armY, armGap, 8, fix1)
    arm2 = new Rope(posX+arm2x, armY, armGap, 8, fix2)
    arm3 = new Rope(posX+arm3x, armY, armGap, 8, fix3)
    arm4 = new Rope(posX+arm4x, armY, armGap, 8, fix4)
    arm5 = new Rope(posX+arm5x, armY, armGap, 8, fix5)

    tentacle1 = new Rope(posX+tentacle1x, tentacleY, tentacleGap, 60, fix6)
    tentacle2 = new Rope(posX+tentacle2x, tentacleY, tentacleGap, 60, fix7)
    tentacle3 = new Rope(posX+tentacle3x, tentacleY, tentacleGap, 60, fix8)
    tentacle4 = new Rope(posX+tentacle4x, tentacleY, tentacleGap, 60, fix9)
    tentacle5 = new Rope(posX+tentacle5x, tentacleY, tentacleGap, 60, fix10)
    tentacle6 = new Rope(posX+tentacle6x, tentacleY, tentacleGap, 60, fix11)

    bellPhysics = Matter.Bodies.trapezoid(posX+windowWidth/80, posY-bellH/3, bellW, bellH, 1, {
        isStatic: true
    })

   Matter.World.add(world, bellPhysics);
    world.gravity.y=0.5
}


function draw() {
    Matter.Engine.update(engine);
    background(0);
    for (let countx = x-50; countx <= x;countx++) {
        push()
        fill(255, 0, 255, 10);
        noStroke()
        ellipse(posX - windowWidth / 40 * 2 + windowWidth/40*2, posY - windowWidth / 60 + windowWidth/40*3.5, countx*2, countx * 4);
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

    image(mouth, posX - windowWidth/40*2, posY-windowWidth/60, windowWidth/40*4, windowWidth/40*7)

    arm1.showArm();
    arm2.showArm();
    arm3.showArm();
    arm4.showArm();
    arm5.showArm();

    tentacle1.showTentacle();
    tentacle2.showTentacle();
    tentacle3.showTentacle();
    tentacle4.showTentacle();
    tentacle5.showTentacle();
    tentacle6.showTentacle();



    tentacle1.slowMotion();
    tentacle2.slowMotion();
    tentacle3.slowMotion();
    tentacle4.slowMotion();
    tentacle5.slowMotion();
    tentacle6.slowMotion();
   
    

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
    image(bell, 0-bellW/2,0-bellH*0.6, bellW, bellH);
    pop()

console.log(arm1)

}

function stingingArms(dataSmartphone) {
    if (dataSmartphone.angle1 <= windowWidth/2 &&
        dataSmartphone.angle1 >= -windowWidth/2 &&
        dataSmartphone.angle2 <= windowHeight/2 &&
        dataSmartphone.angle2 >= -windowHeight/2 ) {
    let sensitivityX = dataSmartphone.angle1;
    let sensitivityY = dataSmartphone.angle2;
    arm1.body.bodies[arm1.n-1].position.x = windowWidth/2 + sensitivityX + arm1x;
    arm1.body.bodies[arm1.n-1].position.y = windowHeight/2 + sensitivityY;

    arm2.body.bodies[arm2.n-1].position.x = windowWidth/2 + sensitivityX + arm2x;
    arm2.body.bodies[arm2.n-1].position.y = windowHeight/2 + sensitivityY;

    arm3.body.bodies[arm3.n-1].position.x = windowWidth/2 + sensitivityX + arm3x;
    arm3.body.bodies[arm3.n-1].position.y = windowHeight/2 + sensitivityY;

    arm4.body.bodies[arm4.n-1].position.x = windowWidth/2 + sensitivityX + arm4x;
    arm4.body.bodies[arm4.n-1].position.y = windowHeight/2 + sensitivityY;

    arm5.body.bodies[arm5.n-1].position.x = windowWidth/2 + sensitivityX + arm5x;
    arm5.body.bodies[arm5.n-1].position.y = windowHeight/2 + sensitivityY;
}
}

function tentaclesTurn(dataSmartphone) {
    if (dataSmartphone.angle1 <= windowWidth/2 &&
        dataSmartphone.angle1 >= -windowWidth/2 &&
        dataSmartphone.angle2 <= windowHeight/2 &&
        dataSmartphone.angle2 >= -windowHeight/2 ) {
    let sensitivityX = dataSmartphone.angle1;
    let sensitivityY = dataSmartphone.angle2;
    angleMode(DEGREES);
    tentacle1.body.bodies[tentacle1.n - 1].position.x = windowWidth / 2 + sensitivityX;
    tentacle1.body.bodies[tentacle1.n - 1].position.y = windowHeight / 2 + sensitivityY;

    tentacle2.body.bodies[tentacle2.n-1].position.x = windowWidth/2 + sensitivityX + tentacle2x;
    tentacle2.body.bodies[tentacle2.n-1].position.y = windowHeight/2 + sensitivityY;

    tentacle3.body.bodies[tentacle3.n-1].position.x = windowWidth/2 + sensitivityX + tentacle3x;
    tentacle3.body.bodies[tentacle3.n-1].position.y = windowHeight/2 + sensitivityY;

    tentacle4.body.bodies[tentacle4.n-1].position.x = windowWidth/2 + sensitivityX + tentacle4x;
    tentacle4.body.bodies[tentacle4.n-1].position.y = windowHeight/2 + sensitivityY;

    tentacle5.body.bodies[tentacle5.n-1].position.x = windowWidth/2 + sensitivityX + tentacle5x;
    tentacle5.body.bodies[tentacle5.n-1].position.y = windowHeight/2 + sensitivityY;

    tentacle6.body.bodies[tentacle6.n-1].position.x = windowWidth/2 + sensitivityX + tentacle6x;
    tentacle6.body.bodies[tentacle6.n-1].position.y = windowHeight/2 + sensitivityY;
    // push();
    // translate(bellPhysics.position.x,bellPhysics.position.y+bellH/2)
    //     let rotationAngle = Math.atan2(windowWidth/2 + sensitivityX/360, windowHeight/2 + sensitivityY/360)*(180 / Math.PI);      
    //     angleMode(DEGREES);
    //     bellPhysics.angle = rotationAngle;
    //     pop();
        }
}


class Rope {
    constructor(ropeX, ropeY, r, n, connectionName) {
        this.r = r;
        this.x = ropeX;
        this.y = ropeY;
        this.n = n;
        this.cN = connectionName;
        this.body = Matter.Composites.stack(this.x, this.y, 1, this.n, 0, this.r/5, function (x, y) {
        return Matter.Bodies.circle(x, y, r*2, {
            restitution: 0.9,
            density: 1,
            friction: 0.5,
        });
    })
    Matter.Composites.chain(this.body, 0, 0, 0, 0, {
        stiffness: 1,
        // damping: 0.5,
        length: this.r *4
    });
    Matter.Composite.add(this.body, this.cN = Matter.Constraint.create({
        bodyB: this.body.bodies[0],
        pointB: {
            x: 0,
            y: this.r*-1
        },
        pointA: {
            x: this.body.bodies[0].position.x,
            y: this.body.bodies[0].position.y
        },
        stiffness: 1,
        // damping: 0.5,
    }));
    Matter.Composite.add(world, [
        this.body//,
        // this.fPN = Matter.Bodies.rectangle(this.x+this.r, this.y+this.r/2, this.r*2, this.r, {
        //     isStatic: true
        // })
    ]);
    
}

slowMotion() {

    this.body.timeScale = 0.3;

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


line(this.cN.pointA.x, this.cN.pointA.y, this.body.bodies[0].position.x, this.body.bodies[0].position.y);
}

showTentacle() {
    for (let f = 0; f < this.n; f++) {
        push();
        angleMode(DEGREES);
        imageMode(CENTER);
        // translate(this.body.bodies[f].bounds.min.x-this.r, this.body.bodies[f].bounds.min.y);
        translate(this.body.bodies[f].position.x, this.body.bodies[f].position.y);
        rotate(this.body.bodies[f].angle);
        fill(0,0,0,0);
        noStroke();
        image(tentacle, 0, 0, this.body.bodies[f].circleRadius*3,this.body.bodies[f].circleRadius*3.5);
        pop();
    
        if (f > 0) {
            stroke(255);

            line(this.body.bodies[f - 1].position.x, this.body.bodies[f - 1].position.y, this.body.bodies[f].position.x, this.body.bodies[f].position.y);
        }
    }
    
 
    line(this.cN.pointA.x, this.cN.pointA.y, this.body.bodies[0].position.x, this.body.bodies[0].position.y);
}
showArm() {
    for (let f = 0; f < this.n; f++) {
        push();
        angleMode(DEGREES);
        imageMode(CENTER);
        // translate(this.body.bodies[f].bounds.min.x+this.body.bodies[f].circleRadius*1.5, this.body.bodies[f].bounds.min.y+this.body.bodies[f].circleRadius*0.5);
        translate(this.body.bodies[f].position.x, this.body.bodies[f].position.y);
        rotate(this.body.bodies[f].angle+90);
        fill(0,0,0,0);
        noStroke();
        image(arm, 0, 0, this.body.bodies[f].circleRadius*1.2,this.body.bodies[f].circleRadius*1.2);
        pop();
    
        if (f > 0) {
            stroke(55,255,0)

            line(this.body.bodies[f - 1].position.x, this.body.bodies[f - 1].position.y, this.body.bodies[f].position.x, this.body.bodies[f].position.y);
        }
    }
    
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