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

let bg, bg_stunned, bell, tentacle, arm, mouth, fish_01, fish_02, fish_03, fish_04, fish_01_stunned, fish_02_stunned, fish_03_stunned, fish_04_stunned;

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

let firstRun = true;
let sX;
let sXc;
let sY;
let sYc;
let sZ;
let sZc;

let stopG = true;

let i = 0;
let j;

let fishCount;
let fishs = [];
let fish = [];
let fishX = [];
let fishXstart = [];
let fishY = [];
let fishDirChoice = [1, -1];
let fishDir = [];
let fishSpeed = [];
let fishFloatMax = [];
let fishFloat = [];
let fishFloatUp = [];
let fishFloatAdd = [];
let fishW, fishH;

let fishStunned = [];
let stopS = false;

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
    fish_01 = loadImage('https://rocky-fjord-59052.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/fish1.png');
    fish_02 = loadImage('https://rocky-fjord-59052.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/fish2.png');
    fish_03 = loadImage('https://rocky-fjord-59052.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/fish3.png');
    fish_04 = loadImage('https://rocky-fjord-59052.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/fish4.png');
    fish_01_stunned = loadImage('https://rocky-fjord-59052.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/fish1_stunned.png');
    fish_02_stunned = loadImage('https://rocky-fjord-59052.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/fish2_stunned.png');
    fish_03_stunned = loadImage('https://rocky-fjord-59052.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/fish3_stunned.png');
    fish_04_stunned = loadImage('https://rocky-fjord-59052.herokuapp.com/https://kind-kowalevski-48d942.netlify.app/public/pic/fish4_stunned.png');

}


function setup() {
    frameRate(30)
    createCanvas(windowWidth, windowHeight)
    socket = io.connect('https://experimenting-webux2.herokuapp.com')
    socket.on('forArm', stingingArms);
    socket.on('forTentacle', tentaclesTurn);
    socket.on('forMouth', mouthGlow);
    socket.on('forMouthStop', stopGlow);
    socket.on('forArmStop', stopStun);
    background(0);
    engine = Matter.Engine.create();
    world = engine.world;
    posX = windowWidth / 2;
    posY = windowWidth * 0.3;
    tentacleY = posY - windowWidth / 70;
    armY = posY - windowWidth / 50;
    bellW = windowWidth / 13 * 3.5;
    bellH = windowWidth / 10 * 1.75;
    gap = windowWidth / 10
    armGap = windowWidth / gap;
    tentacleGap = windowWidth / gap / 8;

    arm1x = -windowWidth / 40 * 3
    arm2x = -windowWidth / 40 * 1.5
    arm3x = +windowWidth / 40 * 0.25
    arm4x = +windowWidth / 40 * 2
    arm5x = +windowWidth / 40 * 3.75

    tentacle1x = -windowWidth / 40 * 3.25
    tentacle2x = -windowWidth / 40 * 1.5
    tentacle3x = -0
    tentacle4x = +windowWidth / 40 * 1.75
    tentacle5x = +windowWidth / 40 * 3.5
    tentacle6x = +windowWidth / 40 * 5.25

    sX = 0;
    sXc = 0;
    sY = 0;
    sYc = 0;
    sZ = 0;
    sZc = 0;

    wW = windowWidth;
    fishW = wW / 23;
    fishH = wW / 40;

    rectMode(CENTER);
    world.gravity.y = 0;

    arm1 = new Rope(posX + arm1x, armY, armGap, 8, fix1)
    arm2 = new Rope(posX + arm2x, armY, armGap, 8, fix2)
    arm3 = new Rope(posX + arm3x, armY, armGap, 8, fix3)
    arm4 = new Rope(posX + arm4x, armY, armGap, 8, fix4)
    arm5 = new Rope(posX + arm5x, armY, armGap, 8, fix5)

    tentacle1 = new Rope(posX + tentacle1x, tentacleY, tentacleGap, 60, fix6)
    tentacle2 = new Rope(posX + tentacle2x, tentacleY, tentacleGap, 60, fix7)
    tentacle3 = new Rope(posX + tentacle3x, tentacleY, tentacleGap, 60, fix8)
    tentacle4 = new Rope(posX + tentacle4x, tentacleY, tentacleGap, 60, fix9)
    tentacle5 = new Rope(posX + tentacle5x, tentacleY, tentacleGap, 60, fix10)
    tentacle6 = new Rope(posX + tentacle6x, tentacleY, tentacleGap, 60, fix11)

    bellPhysics = Matter.Bodies.trapezoid(posX + windowWidth / 35, posY - bellH / 3, bellW, bellH, 1, {
        isStatic: true
    })

    Matter.World.add(world, bellPhysics);
    world.gravity.y = 0.5

    fishCount = random(10, 30);
    for (j = 0; j < fishCount; j++) {
        fishs = [
            [fish_01, fish_01_stunned],
            [fish_02, fish_02_stunned],
            [fish_03, fish_03_stunned],
            [fish_04, fish_04_stunned]
        ];
        append(fish, random(fishs));
        append(fishXstart, random(windowWidth * 0.05, windowWidth * 0.95));
        append(fishY, random(windowHeight * 0.05, windowHeight * 0.95));
        append(fishDir, random(fishDirChoice));
        append(fishSpeed, random(0.01, 0.5))
        append(fishX, fishXstart[j]);
        append(fishStunned, false);
        append(fishFloatMax, random(fishH, fishH*5))
        append(fishFloatUp, random([false, true]));
        append(fishFloatAdd, 0)
    }

}


function draw() {
    Matter.Engine.update(engine);
    background(0);
    for (let k = 0; k < fishCount; k++) {
        push()
        fishFloatAdd += sin(fishFloat) * 3;
        if (fishFloatUp == true) {
            fishFloat += fishH/10
          if (fishFloat >= fishFloatMax) {
            fishFloatUp = false;
          }
        } else {
            fishFloat -= fishH/10
          if (fishFloat <= fishFloatMax*-1) {
            fishFloatUp = true;
          }
        }
        scale(fishDir[k], 1)
        if (fishStunned[k] === false | stopS === true) {
            image(fish[k][0], fishX[k]*fishDir[k], fishY[k]+fishFloatAdd[k], fishW, fishH);
            if (fishX[k] < wW * -0.03) {
                fishDir[k] = 1;
            } else if (fishX[k] > wW * 1.03) {
                fishDir[k] = -1;
            }
            fishX[k] = fishX[k] + (fishSpeed[k] * fishDir[k]);
        } else {
            image(fish[k][1], fishX[k]*fishDir[k], fishY[k], fishW, fishH);
        } 
        pop()
    }
  
    for (let countx = x - 50; countx <= x; countx++) {
        push()
        fill(255, 255, 255, 10);
        noStroke()
        blendMode(SCREEN);
        ellipse(posX - wW / 40 * 1.5 + wW / 40 * 2.5, posY - wW / 60 + wW / 40 * 4.25, countx * 1.5 ^ (countx * 0.75), countx * 2.8);
        pop()
    }

    if (x >= glowControl + 45) {
        negcount = true;
    } else if (x <= glowControl) {
        negcount = false;
    }
    if (negcount == false && i % 5) {
        x++
    } else if (i % 5) {
        x = x - 1
    }
    i++
    if (glow == false) {
        image(mouth, posX - wW / 40 * 1.5, posY - wW / 60, wW / 40 * 5, wW / 40 * 8.5)
    } else {
        image(mouth_glow, posX - wW / 40 * 1.5, posY - wW / 60, wW / 40 * 5, wW / 40 * 8.5)

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

    push()
    angleMode(RADIANS);
    translate(bellPhysics.position.x, bellPhysics.position.y);
    rotate(bellPhysics.angle);
    if (glow == false) {
        image(bell, 0 - bellW / 2, 0 - bellH * 0.6, bellW, bellH);
    } else {
        image(bell_glow, 0 - bellW / 2, 0 - bellH * 0.6, bellW, bellH);
    }
    pop()

    if (stopG === true && glowControl > 80) {
        sX = 0;
        sY = 0;
        sZ = 0;
        glow = false;
        glowControl = 80;
    }

}

function stingingArms(dataSmartphone) {

    let sensitivityX = dataSmartphone.angle1;
    let sensitivityY = dataSmartphone.angle2;
    arm1.body.bodies[arm1.n - 1].position.x = windowWidth / 2 + sensitivityX + arm1x;
    arm1.body.bodies[arm1.n - 1].position.y = windowHeight * 0.75 + sensitivityY;

    arm2.body.bodies[arm2.n - 1].position.x = windowWidth / 2 + sensitivityX + arm2x;
    arm2.body.bodies[arm2.n - 1].position.y = windowHeight * 0.75 + sensitivityY;

    arm3.body.bodies[arm3.n - 1].position.x = windowWidth / 2 + sensitivityX + arm3x;
    arm3.body.bodies[arm3.n - 1].position.y = windowHeight * 0.75 + sensitivityY;

    arm4.body.bodies[arm4.n - 1].position.x = windowWidth / 2 + sensitivityX + arm4x;
    arm4.body.bodies[arm4.n - 1].position.y = windowHeight * 0.75 + sensitivityY;

    arm5.body.bodies[arm5.n - 1].position.x = windowWidth / 2 + sensitivityX + arm5x;
    arm5.body.bodies[arm5.n - 1].position.y = windowHeight * 0.75 + sensitivityY;

    arm1.collision();
    arm2.collision();
    arm3.collision();
    arm4.collision();
    arm5.collision();


}

function stopStun(dataSmartphone) {
    if (dataSmartphone.stopStunning === true) {
        stopS = true;
    } else {
        stopS = false;
    }
}

function tentaclesTurn(dataSmartphone) {

    let sensitivityX = dataSmartphone.angle1;
    let sensitivityY = dataSmartphone.angle2;
    angleMode(DEGREES);
    tentacle1.body.bodies[tentacle1.n - 1].position.x = windowWidth / 2 + sensitivityX;
    tentacle1.body.bodies[tentacle1.n - 1].position.y = windowHeight * 0.75 + sensitivityY;

    tentacle2.body.bodies[tentacle2.n - 1].position.x = windowWidth / 2 + sensitivityX + tentacle2x;
    tentacle2.body.bodies[tentacle2.n - 1].position.y = windowHeight * 0.75 + sensitivityY;

    tentacle3.body.bodies[tentacle3.n - 1].position.x = windowWidth / 2 + sensitivityX + tentacle3x;
    tentacle3.body.bodies[tentacle3.n - 1].position.y = windowHeight * 0.75 + sensitivityY;

    tentacle4.body.bodies[tentacle4.n - 1].position.x = windowWidth / 2 + sensitivityX + tentacle4x;
    tentacle4.body.bodies[tentacle4.n - 1].position.y = windowHeight * 0.75 + sensitivityY;

    tentacle5.body.bodies[tentacle5.n - 1].position.x = windowWidth / 2 + sensitivityX + tentacle5x;
    tentacle5.body.bodies[tentacle5.n - 1].position.y = windowHeight * 0.75 + sensitivityY;

    tentacle6.body.bodies[tentacle6.n - 1].position.x = windowWidth / 2 + sensitivityX + tentacle6x;
    tentacle6.body.bodies[tentacle6.n - 1].position.y = windowHeight * 0.75 + sensitivityY;

}

function mouthGlow(dataSmartphone) {
    stopG = false;
    console.log('X: ' + dataSmartphone.shakeX + ' / ' + sX + ' Y: ' + dataSmartphone.shakeY + ' / ' + sY + ' Z: ' + dataSmartphone.shakeZ + ' / ' + sZ);
    if (sX < 12) {
        if (dataSmartphone.shakeX < 0) {
            sX = dataSmartphone.shakeX * -1;
        } else {
            sX = dataSmartphone.shakeX
        }
    } else {
        sX = sX - 0.1
    }

    if (sY < 12) {
        if (dataSmartphone.shakeY < 0) {
            sY = dataSmartphone.shakeY * -1;
        } else {
            sY = dataSmartphone.shakeY
        }
    } else {
        sY = sY - 0.1
    }

    if (sZ < 12) {
        if (dataSmartphone.shakeZ < 0) {
            sZ = dataSmartphone.shakeZ * -1;
        } else {
            sZ = dataSmartphone.shakeZ
        }
    } else {
        sZ = sZ - 0.1
    }

    if (sX >= 12 || sY >= 12 || sZ >= 12) {
        glow = true;
        glowControl = 80 + (sX + sY + sZ) * 5;

    } else {
        glow = false;
        glowControl = 80
    }
}

function stopGlow(dataSmartphone) {
    if (dataSmartphone.stopGlowing === true) {
        stopG = true
    } else {
        stopG = false
    }
}

class Rope {
    constructor(ropeX, ropeY, r, n, connectionName) {
        this.r = r;
        this.x = ropeX;
        this.y = ropeY;
        this.n = n;
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
            // damping: 0.5,
            length: Matter.Common.clamp(this.r * 4, this.r * 3.9, this.r * 4.1),
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
            stiffness: 1,
            // damping: 0.5,
        }));
        Matter.Composite.add(world, [
            this.body
        ]);
    }

    slowMotion() {

        this.body.timeScale = 0.6;

    }

    collision() {
        for (let l = 0; l < fishCount; l++) {
            for (let m = 0; m < this.n; m++) {
                if (fishX[l] < this.body.bodies[m].position.x + armGap &&
                    fishX[l] + fishW > this.body.bodies[m].position.x &&
                    fishY[l] < this.body.bodies[m].position.y + armGap &&
                    fishY[l] + fishH > this.body.bodies[m].position.y) {
                    fishStunned[l] = true;
                } 
            }
        }

    }
    showTentacle() {
        for (let f = 0; f < this.n; f++) {
            push();
            angleMode(DEGREES);
            imageMode(CENTER);
            translate(this.body.bodies[f].position.x, this.body.bodies[f].position.y);
            rotate(this.body.bodies[f].angle);
            fill(0, 0, 0, 0);
            noStroke();
            if (glow == false) {
                image(tentacle, 0, 0, this.body.bodies[f].circleRadius * 3, this.body.bodies[f].circleRadius * 3.5);
            } else {
                image(tentacle_glow, 0, 0, this.body.bodies[f].circleRadius * 3, this.body.bodies[f].circleRadius * 3.5);
            }
            pop();

            if (f > 0) {
                stroke(255);

                line(this.body.bodies[f - 1].position.x, this.body.bodies[f - 1].position.y + this.body.bodies[f].circleRadius, this.body.bodies[f].position.x, this.body.bodies[f].position.y - this.body.bodies[f].circleRadius);
            }
        }


        line(this.cN.pointA.x, this.cN.pointA.y, this.body.bodies[0].position.x, this.body.bodies[0].position.y - this.body.bodies[0].circleRadius);
    }
    showArm() {
        for (let f = 0; f < this.n; f++) {
            push();
            angleMode(DEGREES);
            imageMode(CENTER);
            translate(this.body.bodies[f].position.x, this.body.bodies[f].position.y);
            rotate(this.body.bodies[f].angle + 90);
            fill(0, 0, 0, 0);
            noStroke();
            if (glow == false) {
                image(arm, 0, 0, this.body.bodies[f].circleRadius * 1.2, this.body.bodies[f].circleRadius * 1.2);
            } else {
                image(arm_glow, 0, 0, this.body.bodies[f].circleRadius * 1.2, this.body.bodies[f].circleRadius * 1.2);
            }
            pop();

            if (f > 0) {
                stroke(55, 255, 0)
                push()
                angleMode(RADIANS);
                imageMode(CENTER);
                translate(this.body.bodies[f - 1].position.x + (this.body.bodies[f].position.x - this.body.bodies[f - 1].position.x) / 2,
                    this.body.bodies[f - 1].position.y + (this.body.bodies[f].position.y - this.body.bodies[f - 1].position.y) / 2)
                angleLink = Math.atan2(this.body.bodies[f - 1].position.x - this.body.bodies[f].position.x, this.body.bodies[f - 1].position.y - this.body.bodies[f].position.y)
                rotate(-angleLink)
                let imgHeight = Math.sqrt(Math.pow(this.body.bodies[f].position.x - this.body.bodies[f - 1].position.x, 2) + (Math.pow(this.body.bodies[f].position.y - this.body.bodies[f - 1].position.y, 2)))
                if (glow == false) {
                    image(arm_link, 0, 0, this.body.bodies[f].circleRadius * 0.25, imgHeight * 0.75)
                } else {
                    image(arm_link_glow, 0, 0, this.body.bodies[f].circleRadius * 0.25, imgHeight * 0.75)
                }
                pop()
            }
        }
        push()
        translate(this.cN.pointA.x + (this.body.bodies[0].position.x - this.cN.pointA.x) / 2,
            this.cN.pointA.y + (this.body.bodies[0].position.y - this.cN.pointA.y) / 2)
        angleLink = Math.atan2(this.cN.pointA.x - this.body.bodies[0].position.x, this.cN.pointA.y - this.body.bodies[0].position.y)
        rotate(-angleLink);
        let imgHeightFirst = Math.sqrt(Math.pow(this.body.bodies[0].position.x - this.cN.pointA.x, 2) + (Math.pow(this.body.bodies[0].position.y - this.cN.pointA.y, 2)))
        if (glow == false) {
            image(arm_link, 0, 0, this.body.bodies[0].circleRadius * 0.25, imgHeightFirst * 0.75)
        } else {
            image(arm_link_glow, 0, 0, this.body.bodies[0].circleRadius * 0.25, imgHeightFirst * 0.75)
        }
        pop()
    }
}
