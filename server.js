var express = require("express");
var fs = require("fs");
var clientEmail = require("./clientEmail.js");

var app = express();
app.use('/css', express.static(__dirname + '/css'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/javascript', express.static(__dirname + '/javascript'));
app.use(express.bodyParser());

var buf = fs.readFileSync("html/index.html");
var index = buf.toString();

app.get('/', function(request, response) {
    response.send(index);
});

app.post('/', function(request, response){
    var email = request.body.email;
    var name = request.body.name;
    var firstname = request.body.firstname;
    var gender = request.body.gender;
    var mobile = request.body.mobile;
    var referral = request.body.referral;
    var school = request.body.school;
    var work = request.body.work;
    var full = request.body.full;

    clientEmail.sendEmail(firstname,email);
    response.redirect('/');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
