// from https://betterprogramming.pub/track-your-smartphone-in-2d-with-javascript-1ba44603c0df
var socket = io.connect('https://fun-of-a-jellyfish-085bbbd48029.herokuapp.com')

let initPos;
let calibrate = true;
var stopGlowing = false;
var stopStunning = false;
var stopMovingRight = false;
var stopMovingLeft = false;

const sensor = new AbsoluteOrientationSensor({
    frequency: 60
});
sensor.addEventListener("reading", (e) => handleSensor(e));
sensor.start();

let acl = new LinearAccelerationSensor({
    frequency: 30
});

acl.addEventListener('reading', () => handleAcl());
acl.start();

document.body.addEventListener("click", () => {
    calibrate = true
})

//makes some kind of euler angle of sensor data
function toEuler(q) {
    let sinr_cosp = 2 * (q[3] * q[0] + q[1] * q[2]);
    let cosr_cosp = 1 - 2 * (q[0] * q[0] + q[1] * q[1]);
    let roll = Math.atan2(sinr_cosp, cosr_cosp);

    let siny_cosp = 2 * (q[3] * q[2] + q[0] * q[1]);
    let cosy_cosp = 1 - 2 * (q[1] * q[1] + q[2] * q[2]);
    let yaw = Math.atan2(siny_cosp, cosy_cosp);

    return [yaw, roll];
}

//choose what to navigate
document.getElementById("arm").addEventListener("click", function () {
    if (this.classList.contains("active")) {
        this.classList.remove("active");
         stopStunning = true;
        console.log('deactivated')
    } else {
        this.classList.add("active")
         stopStunning = false;
        console.log('activated')
    }
    var dataSmartphone = {
        stopStunning: stopStunning
    }
        socket.emit('forArmStop', dataSmartphone);
})

document.getElementById("tentacle").addEventListener("click", function () {
    if (this.classList.contains("active")) {
        this.classList.remove("active");
        console.log('deactivated')
    } else {
        this.classList.add("active")
        console.log('activated')
    }
})

document.getElementById("mouth").addEventListener("click", function () {
    if (this.classList.contains("active")) {
        this.classList.remove("active");
         stopGlowing = true;
        console.log('deactivated')
    } else {
        this.classList.add("active")
         stopGlowing = false;
        console.log('activated')
    }

    var dataSmartphone = {
        stopGlowing: stopGlowing
    }
        socket.emit('forMouthStop', dataSmartphone);
})

document.getElementById("moveRight").addEventListener("click", function () {
    if (this.classList.contains("active")) {
        this.classList.remove("active");
         stopMovingRight = true;
        console.log('deactivated')
    } else {
        this.classList.add("active")
         stopMovingRight = false;
        console.log('activated')
    }
    var dataSmartphone = {
        stopMovingRight: stopMovingRight
}
    socket.emit('forRightStop', dataSmartphone);
})

document.getElementById("moveLeft").addEventListener("click", function () {
    if (this.classList.contains("active")) {
        this.classList.remove("active");
         stopMovingLeft = true;
        console.log('deactivated')
    } else {
        this.classList.add("active")
         stopMovingLeft = false;
        console.log('activated')
    }
    var dataSmartphone = {
        stopMovingLeft: stopMovingLeft
}
    socket.emit('forLeftStop', dataSmartphone);
})

//get sensor data and send it
function handleSensor(e) {
    let quaternion = e.target.quaternion;
    let angles = toEuler(quaternion);

    if (calibrate) {
        initPos = angles;
        calibrate = false;
    }

    let dist = angles.map((angle, i) => calcDist(angle, initPos[i]));
    getSensorData()

    function getSensorData() {
        var dataSmartphone = {
            angle1: dist[0],
            angle2: dist[1]
        }

        if (document.getElementById("arm").classList.contains("active") && dist[0] <1000 && dist[0] >-1000 && dist[1] <1000 && dist[1] >-1000) {
            socket.emit('forArm', dataSmartphone);
        }

        if (document.getElementById("tentacle").classList.contains("active") && dist[0] <1000 && dist[0] >-1000 && dist[1] <1000 && dist[1] >-1000) {
            socket.emit('forTentacle', dataSmartphone);
        }

    }
}

// from https://developpaper.com/html5-js-realizes-the-function-of-shaking-the-mobile-phone/
function handleAcl() {
    getAclData()

    function getAclData() {
        console.log('THIS IS IT: x=' + acl.x + ' y=' + acl.y + ' z=' + acl.z);

        var dataSmartphone = {
            shakeX: acl.x,
            shakeY: acl.y,
            shakeZ: acl.z
        }
        if (document.getElementById("mouth").classList.contains("active")) {
            socket.emit('forMouth', dataSmartphone);
        }
        if (document.getElementById("moveRight").classList.contains("active")) {
            socket.emit('forRight', dataSmartphone);
        }

        if (document.getElementById("moveLeft").classList.contains("active")) {
            socket.emit('forLeft', dataSmartphone);
        }
    }
}

function calcDist(angle, initAngle) {
    angle = (angle - initAngle) * (180 / Math.PI);
    angle = angle < 0 ? angle + 360 : angle;
    angle = angle > 180 ? angle - 360 : angle;

    //800 can be changed to adjust sensitivity
    let dist = Math.round(-300 * Math.tan(angle * (Math.PI / 180)));
    return dist;
}

