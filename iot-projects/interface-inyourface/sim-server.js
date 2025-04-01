// A server that simulates a device that is taking regular temperature readings.

// Load the http module to create an http server.
const http = require("http");
const WebSocket = require("ws");
const port = 3333;

//TODO 1: Variables and generateTemperature function
var temp = 72;
var nextchange = 0;

function generateTemperature() {
  let changeDifference = Math.random() - 0.5;

  nextchange += changeDifference;

  temp += nextchange;

  if (temp <= 0) {
    temp = 0;
  } else if (temp >= 100) {
    temp = 100;
  }
}
setInterval(generateTemperature, 1000);
// Configure our HTTP server.
const server = http.createServer(function (req, res) {
  /* DO NOT EDIT THIS CODE */
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  /* DO NOT EDIT THIS CODE */

  //TODO 2: Regular Polling Server

  if (req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ value: temp }));
  }
});

//TODO 7: WebSocket Server

const wss = new WebSocket.Server({ server });

wss.on("connection", function (socket) {
  setInterval(function () {
    socket.send(JSON.stringify({ value: temp }));
  }, 1000);
});

/* DO NOT EDIT THIS CODE */
server.listen(port);
