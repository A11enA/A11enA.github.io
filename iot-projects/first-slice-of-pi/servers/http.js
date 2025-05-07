var sensorRoutes = require('./../routes/sensors');
var actuatorRoutes = require('./../routes/actuators');
const express = require('express'),
	cors = require('cors');
	var app = express();
	app.use(cors());
	app.use('/pi/sensors', sensorRoutes);
	app.use('/pi/actuators', actuatorRoutes);

	app.get("/", function (req, res) {
		res.send('"Gottem" - Isagi Yoichi');
	  });
	app.get("/pi", function (req, res) {
		res.send('"A violation of loyalty to Kaiser. That' + "'" + 's your first yellow card."-- Alexis Ness');
	});
	  
	  




module.exports = app;

// I have looked through all files