const http = require("http");

const port = 1111;
let serverStatus = undefined;
function requestFunction(req, res) {
  try {
    if (req.method === "GET") {
        serverStatus = {};
      res.writehead(200, { "Content-Type": "text/plain" });
      res.write(serverStatus);
    } else if (req.method === "PUT") {
      var body = "";
      req.on("data", function () {
        body += data.toString();
      });
      req.on("end", function () {
        JSON.parse(body) = serverStatus
      });
    res.writehead(200 {"Content-Type": "text/plain"})
    res.write("the server has been updated.")
    }
  } catch {
    res.write("The server has no data.");
    res.writehead(500, { "Content-Type": "text/plain" });
  } finally {
    res.write("-and the message arrived");
    res.end();
  }
}

const server = http.createServer(requestFunction).listen(port);
