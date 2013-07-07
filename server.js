var express = require("express");
var fs = require("fs");

var app = express();
app.use('/css', express.static(__dirname + '/css'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/javascript', express.static(__dirname + '/javascript'));

var buf = fs.readFileSync("html/index.html");
var index = buf.toString();

app.get('/', function(request, response) {
    response.send(index);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
