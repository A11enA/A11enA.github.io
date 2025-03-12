const http = require('http');
const port = 3000;

var data = undefined;
var secret = "I love vanilla icecream"
var list = []

http.createServer(function(req,res){
if (req.method === 'GET') {

res.writehead(200, {'Content-Type':'text/plain'})
res.end(secret);

} else if (req.method === 'DELETE') {
    res.writehead(200, {'Content-Type':'text/plain'})
    secret = null;
    res.end('secret deleted!')
} else if (req.method === 'PUT') {
    req.on('data', function (chunk) {
        console.log(chunk.tosring());
        secret += chunk.toString
    });

    req.on('end', function () {
    res.writehead(200, {'Content-Type':'text/plain'})
    res.end(secret);

})} else if (req.method === 'POST') {
    req.on('data', function (chunk) {
        const incomingdata = chunk.toString()
        list.push(incomingData);
    });

    req.on('end', function () {
    res.writehead(200, {'Content-Type':'text/plain'})
    console.log(list);
    res.end('data added successfully');
})
}
}).listen(port);


console.log("listening on port " + port);
console.log('http://localhost:$(port)');


