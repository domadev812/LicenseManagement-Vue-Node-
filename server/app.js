var express    = require('express'),
    app        = express(),
    http       = require('http').Server(app),
    bodyParser = require("body-parser"),
    path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../dist')));
app.use("/", express.static(__dirname + "/"));


// Desktop requests

app.get('/', function(req, res) {    
    console.log("Redirecting");
    res.sendFile(path.resolve(__dirname, '../dist/index.html')); 
});


http.listen(8080,function(){
	console.log("Connected & Listen to port 8080");
});
