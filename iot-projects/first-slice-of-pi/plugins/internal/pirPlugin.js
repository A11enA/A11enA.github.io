const resources = require('./../../resources/model');
const Gpio = require('onoff').Gpio;

function connectHardware () {
    sensor = new Gpio(516, 'in', 'both');
    sensor.watch(function (err, value){
        if (err === false){
            device.value = !!value
        } else if (err === true){
            console.log(err)
        }
    });
}

function start (){
    connectHardware()
}

function stop (){
    sensor.unexport()
}

let sensor;
const device = resources.pi.sensors.pir;
exports.start = start;
