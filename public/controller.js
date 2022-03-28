// from https://betterprogramming.pub/track-your-smartphone-in-2d-with-javascript-1ba44603c0df
var socket = io.connect('https://experimenting-webux2.herokuapp.com')

const sensor = new AbsoluteOrientationSensor({frequency: 60});
sensor.addEventListener("reading", (e) => handleSensor(e));
sensor.start();   

let acl = new LinearAccelerationSensor({frequency: 60});
acl.addEventListener('reading', () => handleAcl());
acl.start();

let initPos;
let calibrate = true;
let firstRun = true;
let aX;
let aY;
let aZ;


document.body.addEventListener("click", () => {calibrate = true})

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
document.getElementById("arm").addEventListener("click", function() {
    if (this.classList.contains("active")) {
        this.classList.remove("active");
        console.log('deactivated')
    } else {
        this.classList.add("active")
        console.log('activated')
    }
})

document.getElementById("tentacle").addEventListener("click", function() {
    if (this.classList.contains("active")) {
        this.classList.remove("active");
        console.log('deactivated')
    } else {
        this.classList.add("active")
        console.log('activated')
    }
})

document.getElementById("mouth").addEventListener("click", function() {
    if (this.classList.contains("active")) {
        this.classList.remove("active");
        console.log('deactivated')
    } else {
        this.classList.add("active")
        console.log('activated')
    }
})

// from https://developpaper.com/html5-js-realizes-the-function-of-shaking-the-mobile-phone/


    

//get sensor data and send it
function handleSensor(e){
    let quaternion = e.target.quaternion;
    let angles = toEuler(quaternion);

    if(calibrate){
      initPos = angles;
      calibrate = false;
    }
        
    let dist = angles.map((angle, i) => calcDist(angle, initPos[i]));
    console.log(dist);
    getSensorData()
    function getSensorData () {
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
function handleAcl() {
    getAclData()
    function getAclData () {
        console.log(acl);
        if(firstRun == false) {
            updateShakeIntensity(aX, acl.x);
            updateShakeIntensity(aY, acl.y);
            updateShakeIntensity(aZ, acl.z);
        }
        else{
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
    console.log(dist);
    return dist;
 
}

function updateShakeIntensity(name, axe) {
    if(name>axe) {
        name = name-0.2;
    }
    else {
        name = axe;
    }
}