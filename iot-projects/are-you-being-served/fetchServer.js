// fetchServer.js file
const http = require("http");

const port = 1111;

http
  .createServer(async function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    var fetchResponse = await fetch('https://A11enA.github.io');
    console.log(fetchResponse.ok);
    if (fetchResponse)
  })
  .listen(port);