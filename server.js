//Module dependencies
var express = require("express");
var consolidate = require("consolidate");
var http = require("http");
var path = require('path');
var swig = require('swig');
var clientEmail = require("./node_modules/helper_modules/clientEmail");
var profileEmail = require("./node_modules/helper_modules/profileEmail");

//Initialize swig templating
swig.init({
    root: __dirname + '/views',
    allowErrors: true // allows errors to be thrown and caught by express instead of suppressed by Swig
});

var app = express();
app.set('port', 5000);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('.html', consolidate.swig);
app.use('/public', express.static(__dirname + '/public'));
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(app.router);

//Routers
app.get('/', function(req, res) {
    res.render('index.html', {});
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

    var msg = "null";
    clientEmail.sendEmail(firstname,email);
    profileEmail.sendEmail(email, name, gender, mobile, referral, school, work, full);
    response.redirect('/');
});


//localhost server
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port') + '. Environment is ' + process.env.NODE_ENV);
});
