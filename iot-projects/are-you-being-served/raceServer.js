const http = require("http");
const async = require("async");

const port = 1111;

http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    
    let racers = ["Green Ambler", "Catalack", "Steel Runner", "G.I. Jogger"];
    // TODO 6: Get the start time for the race
    
    let d = new Date();
    let startTime = d.getTime();

    // TODO 12: Make the whole thing parallel
    async.parallel( 
        // TODO 8: Supply an array of functions
        [
          function greenAmbler(callback){
            wrapper(callback);
          },
          function catalack(callback){
            wrapper(callback);
          },
          function steelRunner(callback){
            wrapper(callback);
          },
          function giJogger(callback){
            wrapper(callback);
          }
        ],
        function (error, results) {
            // TODO 9: add a callback function to the end of the async call to tally the results 
            res.write("Results:\n");
            var victoryOrder = sortTogether(racers, results);
            
            for (var i = 0; i < victoryOrder.length; i++){
                res.write(victoryOrder[i] + "\n");
            }
            let d = new Date();
            let endTime = d.getTime();
            let duration = endTime - startTime;
            res.write("Race Duration: " + duration + "ms\n");
            res.end();
        }
    );
    
}).listen(port);

// TODO 7: create a common function to be called by all functions in the array passed to the async function
function wrapper(callback){
        
    function dateCall(){
        var d = new Date();
        callback(null,d.getTime)
    }
    
    setTimeout(dateCall, Math.random() * 1000)
}

// sortTogether takes in an array of racer names and an array of times that the racers finished the race.
// It returns a new array of names, with the list or racers sorted by the time that they finished.
function sortTogether(names, times) {
    var tempList = [];
    for (var i = 0; i < names.length; i++) {
        tempList.push({'name': names[i], 'time': times[i]});
    }

    tempList.sort(function(a, b) {
        return ((a.time < b.time) ? -1 : ((a.time == b.time) ? 0 : 1));
    });

    for (var i = 0; i < tempList.length; i++) {
        names[i] = tempList[i].name;
    }
    return names;
}
