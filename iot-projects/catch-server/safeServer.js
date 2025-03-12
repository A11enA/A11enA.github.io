const http = require("http");

const port = 3000;
let serverStatus = undefined;
function requestFunction(req,res){
    try {
        if(req.method === 'GET'){
            res.writehead(200, {'Content-Type':'text/plain'})
            res.end(serverStatus);
        }
    } catch {
        res.write('The server has no data.');
        res.writehead(500, {'Content-Type':'text/plain'})
    } finally {
        res.write("--and the message arrived")
        res.end()
    }
}

const server = http.createServer(

requestFunction

).listen(port);

