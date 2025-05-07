const resources = require('./../../resources/model');
const sensorDriver = require('node-dht-sensor');

function connectHardware () {
    sensor = {
        initialize: function(){
            sensorDriver.initialize(device.model, device.gpio)
        },
        read: function(){
            var readings = sensorDriver.read();
            device.temperature.value = parseFloat(readings.temperature);
            device.humidity.value = parseFloat(readings.humidity);
        }
    }
    sensor.initialize();
    sensor.read();

    interval = setInterval(function () {
        sensor.read();
      }, localParams.frequency);
}

function start (params){
    localParams = params ? params : localParams;
    connectHardware();
}

function stop (){
    clearInterval(interval)
}

let interval, sensor;
const device = resources.pi.sensors.dht;
let localParams = {'frequency': 2000};
exports.start = start;

