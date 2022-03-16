// from https://betterprogramming.pub/track-your-smartphone-in-2d-with-javascript-1ba44603c0df
var socket = io.connect('https://experimenting-webux2.herokuapp.com')

const sensor = new AbsoluteOrientationSensor({frequency: 60});
sensor.addEventListener("reading", (e) => handleSensor(e));
sensor.start();   

let initPos;
let calibrate = true;

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
document.getElementsByClassName("arm").addEventListener("click", function() {
    if (this.classList.contains("active")) {
        this.classList.remove("active");
    } else {
        this.classList.add("active")
    }
})


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
        
        document.getElementsByClassName("arm");
        if ((this.classList.contains("active")) {
        socket.emit('angle', dataSmartphone);
    }
    }
}   

function calcDist(angle, initAngle) {
    angle = (angle - initAngle) * (180 / Math.PI);
    angle = angle < 0 ? angle + 360 : angle;
    angle = angle > 180 ? angle - 360 : angle;

    //800 can be changed to adjust sensitivity
    let dist = Math.round(-800 * Math.tan(angle * (Math.PI / 180)));
    console.log(dist);
    return dist;
 
}

