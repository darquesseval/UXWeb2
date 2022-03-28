// from https://betterprogramming.pub/track-your-smartphone-in-2d-with-javascript-1ba44603c0df
var socket = io.connect('https://experimenting-webux2.herokuapp.com')

let initPos;
let calibrate = true;
let firstRun = true;
let aX;
let aXcounter = 0;
let aY
let aYcounter = 0;
let aZ
let aZcounter = 0;

const sensor = new AbsoluteOrientationSensor({
    frequency: 60
});
sensor.addEventListener("reading", (e) => handleSensor(e));
sensor.start();

let acl = new LinearAccelerationSensor({
    frequency: 60
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
        console.log('deactivated')
    } else {
        this.classList.add("active")
        console.log('activated')
    }
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
        console.log('deactivated')
    } else {
        this.classList.add("active")
        console.log('activated')
    }
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
    console.log(dist);
    getSensorData()

    function getSensorData() {
        var dataSmartphone = {
            angle1: dist[0],
            angle2: dist[1]
        }

        if (document.getElementById("arm").classList.contains("active")) {
            socket.emit('forArm', dataSmartphone);
        }

        if (document.getElementById("tentacle").classList.contains("active")) {
            socket.emit('forTentacle', dataSmartphone);
        }

    }
}

// from https://developpaper.com/html5-js-realizes-the-function-of-shaking-the-mobile-phone/
function handleAcl() {
    getAclData()

    function getAclData() {
        console.log('THIS IS IT: ' + acl);
        if (firstRun === false) {
            updateShakeIntensity(aX, acl.x, aXcounter);
            updateShakeIntensity(aY, acl.y, aYcounter);
            updateShakeIntensity(aZ, acl.z, aZcounter);
        } else {
            aX = acl.x
            aY = acl.y
            aZ = acl.z
            firstRun = false
        }
        var dataSmartphone = {
            shakeX: aX,
            shakeY: aY,
            shakeZ: aZ
        }

        if (document.getElementById("mouth").classList.contains("active")) {
            socket.emit('forMouth', dataSmartphone);
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

function updateShakeIntensity(name, axe, counter) {
    this.name = name;
    this.axe = axe;
    this.counter = counter;
    if (this.name > this.axe) {
        this.counter = this.counter+1
        if(this.counter >= 15) {
        this.name = this.name - 1;
    }
    } else {
        this.name = this.axe;
        this.counter = 0
    }
}