const async = require('async');

async.series(
    [
    function(callback){
        callback(null,'marco');
    },
    function(callback){
        callback(null,'polo');
    },
    function(callback){
        callback(null, 'found you')
    }
    ],
    function(err, results){
        console.log(results);
    }
);