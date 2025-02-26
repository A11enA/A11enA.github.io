// fetchServer.js file
var args = process.argv.slice(2);
const http = require("http");

const port = 1111;

http
  .createServer(async function (req, res) {
    console.log(args);
    if (args[1] === 'html'){
      res.writeHead(200, { "Content-Type": "text/html" });
    } else if (args[1] === 'text'){
      res.writeHead(200, { "Content-Type": "text/plain" });
    }
    var url = args[0] ? args[0] : "https://a11ena.github.io/";
    var fetchResponse = await fetch(url);
    var html = await fetchResponse.text()
    res.write(html);
    res.end();
  })
  .listen(port);