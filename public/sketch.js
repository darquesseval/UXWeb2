var socket
let engine
let world
let render

let connection
let circleChain
let angleLink 

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

let glowControl = 80;
let x = glowControl;
let negcount = false;
let glow = false;

let wW;

function preload() {
    bg = loadImage('https://rocky-fjord-59052.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/background.jpeg');
    bg_stunned = loadImage('https://rocky-fjord-59052.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/background_stunned.jpeg');
    bell = loadImage('https://rocky-fjord-59052.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/bell.png');
    tentacle = loadImage('https://rocky-fjord-59052.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/tentacle.png');
    arm = loadImage('https://rocky-fjord-59052.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/arm.png');
    mouth = loadImage('https://rocky-fjord-59052.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/mouth.png');
    arm_link = loadImage('https://rocky-fjord-59052.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/arm_link.png');
    bell_glow = loadImage('https://rocky-fjord-59052.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/bell_glow.png');
    tentacle_glow = loadImage('https://rocky-fjord-59052.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/tentacle_glow.png');
    arm_glow = loadImage('https://rocky-fjord-59052.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/arm_glow.png');
    mouth_glow = loadImage('https://rocky-fjord-59052.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/mouth_glow.png');
    arm_link_glow = loadImage('https://rocky-fjord-59052.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/arm_link_glow.png');

}


function setup() {
    frameRate(30)
    createCanvas(windowWidth, windowHeight)
    socket = io.connect('https://experimenting-webux2.herokuapp.com')
    socket.on('forArm', stingingArms); 
    socket.on('forTentacle', tentaclesTurn);  
    socket.on('forMouth', mouthGlow);  
    // socket.on('mouse', newDrawing);
    background(0);
    engine = Matter.Engine.create();
    world = engine.world;
    posX = windowWidth / 2;
    posY = windowWidth*0.3;
    tentacleY = posY-windowWidth/70;
    armY = posY-windowWidth/50;
    bellW = windowWidth/13*3.5;
    bellH = windowWidth/10*1.75;
    gap = windowWidth/10
    armGap = windowWidth / gap;
    tentacleGap = windowWidth / gap/8;
    
    arm1x = -windowWidth/40*3
    arm2x = -windowWidth/40*1.5
    arm3x = +windowWidth/40*0.25
    arm4x = +windowWidth/40*2
    arm5x = +windowWidth/40*3.75

    tentacle1x = -windowWidth/40*3.25
    tentacle2x = -windowWidth/40*1.5
    tentacle3x = -0
    tentacle4x = +windowWidth/40*1.75
    tentacle5x = +windowWidth/40*3.5
    tentacle6x = +windowWidth/40*5.25

wW = windowWidth;



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

    bellPhysics = Matter.Bodies.trapezoid(posX+windowWidth/35, posY-bellH/3, bellW, bellH, 1, {
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
        fill(255, 255, 255, 10);
        noStroke()
        ellipse(posX - wW / 40 * 1.5 + wW/40*2.5, posY - wW / 60 + wW/40*4.25, countx*1.4, countx * 2.8);
        pop()
    }

    if (x >= glowControl + 45) {
        negcount = true;
    } else if (x <= glowControl) {
        negcount = false;
    }
    if (negcount == false) {
        x++
    } else {
        x = x-1
    }

    if(glow==false) {
    image(mouth, posX - wW/40*1.5, posY-wW/60, wW/40*5, wW/40*8.5)
} else {
    image(mouth_glow, posX - wW/40*1.5, posY-wW/60, wW/40*5, wW/40*8.5)

}

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
    if(glow==false) {
        image(bell, 0-bellW/2,0-bellH*0.6, bellW, bellH);
    } else {
        image(bell_glow, 0-bellW/2,0-bellH*0.6, bellW, bellH);
    }
    pop()


}

function stingingArms(dataSmartphone) {
  
    let sensitivityX = dataSmartphone.angle1;
    let sensitivityY = dataSmartphone.angle2;
    arm1.body.bodies[arm1.n-1].position.x = windowWidth/2 + sensitivityX + arm1x;
    arm1.body.bodies[arm1.n-1].position.y = windowHeight*0.75 + sensitivityY;

    arm2.body.bodies[arm2.n-1].position.x = windowWidth/2 + sensitivityX + arm2x;
    arm2.body.bodies[arm2.n-1].position.y = windowHeight*0.75 + sensitivityY;

    arm3.body.bodies[arm3.n-1].position.x = windowWidth/2 + sensitivityX + arm3x;
    arm3.body.bodies[arm3.n-1].position.y = windowHeight*0.75 + sensitivityY;

    arm4.body.bodies[arm4.n-1].position.x = windowWidth/2 + sensitivityX + arm4x;
    arm4.body.bodies[arm4.n-1].position.y = windowHeight*0.75 + sensitivityY;

    arm5.body.bodies[arm5.n-1].position.x = windowWidth/2 + sensitivityX + arm5x;
    arm5.body.bodies[arm5.n-1].position.y = windowHeight*0.75 + sensitivityY;

}

function tentaclesTurn(dataSmartphone) {

    let sensitivityX = dataSmartphone.angle1;
    let sensitivityY = dataSmartphone.angle2;
    angleMode(DEGREES);
    tentacle1.body.bodies[tentacle1.n - 1].position.x = windowWidth / 2 + sensitivityX;
    tentacle1.body.bodies[tentacle1.n - 1].position.y = windowHeight*0.75 + sensitivityY;

    tentacle2.body.bodies[tentacle2.n-1].position.x = windowWidth/2 + sensitivityX + tentacle2x;
    tentacle2.body.bodies[tentacle2.n-1].position.y = windowHeight*0.75 + sensitivityY;

    tentacle3.body.bodies[tentacle3.n-1].position.x = windowWidth/2 + sensitivityX + tentacle3x;
    tentacle3.body.bodies[tentacle3.n-1].position.y = windowHeight*0.75 + sensitivityY;

    tentacle4.body.bodies[tentacle4.n-1].position.x = windowWidth/2 + sensitivityX + tentacle4x;
    tentacle4.body.bodies[tentacle4.n-1].position.y = windowHeight*0.75 + sensitivityY;

    tentacle5.body.bodies[tentacle5.n-1].position.x = windowWidth/2 + sensitivityX + tentacle5x;
    tentacle5.body.bodies[tentacle5.n-1].position.y = windowHeight*0.75 + sensitivityY;

    tentacle6.body.bodies[tentacle6.n-1].position.x = windowWidth/2 + sensitivityX + tentacle6x;
    tentacle6.body.bodies[tentacle6.n-1].position.y = windowHeight*0.75 + sensitivityY;
    // push();
    // translate(bellPhysics.position.x,bellPhysics.position.y+bellH/2)
    //     let rotationAngle = Math.atan2(windowWidth/2 + sensitivityX/360, windowHeight/2 + sensitivityY/360)*(180 / Math.PI);      
    //     angleMode(DEGREES);
    //     bellPhysics.angle = rotationAngle;
    //     pop();
        
}


function mouthGlow(dataSmartphone) {
console.log('X: ' + dataSmartphone.shakeX + 'Y: ' + dataSmartphone.shakeY + 'Z: ' + dataSmartphone.shakeZ);

if(dataSmartphone.shakeX >= 12 || dataSmartphone.shakeY >= 12 || dataSmartphone.shakeZ >= 12){
glow = true;
glowControl = 80 + (dataSmartphone.shakeX + dataSmartphone.shakeY + dataSmartphone.shakeZ)/3;

} else {
glow = false;
    glowControl = 80
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
        length: Matter.Common.clamp(this.r *4, this.r *3.9, this.r *4.1),
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

    this.body.timeScale = 0.6;

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
        if(glow==false) {
            image(tentacle, 0, 0, this.body.bodies[f].circleRadius*3,this.body.bodies[f].circleRadius*3.5);
        } else {
            image(tentacle_glow, 0, 0, this.body.bodies[f].circleRadius*3,this.body.bodies[f].circleRadius*3.5);
        }
        pop();
    
        if (f > 0) {
            stroke(255);

            line(this.body.bodies[f - 1].position.x, this.body.bodies[f - 1].position.y+this.body.bodies[f].circleRadius, this.body.bodies[f].position.x, this.body.bodies[f].position.y-this.body.bodies[f].circleRadius);
        }
    }
    
 
    line(this.cN.pointA.x, this.cN.pointA.y, this.body.bodies[0].position.x, this.body.bodies[0].position.y-this.body.bodies[0].circleRadius);
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
        if(glow==false) {
            image(arm, 0, 0, this.body.bodies[f].circleRadius*1.2,this.body.bodies[f].circleRadius*1.2);
        } else {
            image(arm_glow, 0, 0, this.body.bodies[f].circleRadius*1.2,this.body.bodies[f].circleRadius*1.2);
        }
        pop();
    
        if (f > 0) {
            stroke(55,255,0)
            push()
            angleMode(RADIANS);
            imageMode(CENTER);
            translate(this.body.bodies[f - 1].position.x+(this.body.bodies[f].position.x-this.body.bodies[f-1].position.x)/2, 
                      this.body.bodies[f - 1].position.y+(this.body.bodies[f].position.y-this.body.bodies[f-1].position.y)/2)
            angleLink = Math.atan2(this.body.bodies[f-1].position.x-this.body.bodies[f].position.x, this.body.bodies[f-1].position.y-this.body.bodies[f].position.y)
            //angleMode(DEGREES);
            //rotate(this.body.bodies[f].angle-120+(this.n-f)*-30);
            rotate(-angleLink)
            let imgHeight = Math.sqrt(Math.pow(this.body.bodies[f].position.x-this.body.bodies[f-1].position.x, 2)+(Math.pow(this.body.bodies[f].position.y-this.body.bodies[f-1].position.y, 2)))
            if(glow==false) {
            image(arm_link, 0, 0, this.body.bodies[f].circleRadius*0.25, imgHeight*0.75)
        } else { 
            image(arm_link_glow, 0, 0, this.body.bodies[f].circleRadius*0.25, imgHeight*0.75)
        }
            pop()
        }
    }
    push()
    translate(this.cN.pointA.x+(this.body.bodies[0].position.x-this.cN.pointA.x)/2, 
    this.cN.pointA.y+(this.body.bodies[0].position.y-this.cN.pointA.y)/2)
    angleLink = Math.atan2(this.cN.pointA.x-this.body.bodies[0].position.x, this.cN.pointA.y-this.body.bodies[0].position.y)
            rotate(-angleLink);
            let imgHeightFirst = Math.sqrt(Math.pow(this.body.bodies[0].position.x-this.cN.pointA.x, 2)+(Math.pow(this.body.bodies[0].position.y-this.cN.pointA.y, 2)))
            if(glow==false) {
                image(arm_link, 0, 0, this.body.bodies[0].circleRadius*0.25, imgHeightFirst*0.75)
            } else { 
                image(arm_link_glow, 0, 0, this.body.bodies[0].circleRadius*0.25, imgHeightFirst*0.75)
            }
            pop()
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