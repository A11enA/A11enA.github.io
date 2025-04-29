const http = require("http");

const port = 4645;
let serverStatus = undefined;
function requestFunction(req, res) {
  try {
    if (req.method === "GET") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.write(serverStatus.status);
    } else if (req.method === "PUT") {
      var body = "";
      req.on("data", function (data) {
        body += data.toString();
      });
      req.on("end", function () {
        serverStatus = JSON.parse(body);
      });
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.write("the server has been updated.");
    }
  } catch {
    res.writehead(500, { "Content-Type": "text/plain" });
  } finally {
    res.write("-and the message arrived");
    res.end();
  }
}

const server = http.createServer(requestFunction).listen(port);
