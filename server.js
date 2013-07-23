//Module dependencies
var express = require("express");
var consolidate = require("consolidate");
var http = require("http");
var swig = require('swig');
var crypto = require('crypto');
var clientEmail = require("./node_modules/helper_modules/clientEmail");
var profileEmail = require("./node_modules/helper_modules/profileEmail");

//Initialize swig templating
swig.init({
    root: __dirname + '/views',
    allowErrors: true // allows errors to be thrown and caught by express instead of suppressed by Swig
});

var app = express();
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


app.post('/', function(req, res){
    var email = req.body.email;
    var name = req.body.name;
    var firstname = req.body.firstname;
    var gender = req.body.gender;
    var mobile = req.body.mobile;
    var referral = req.body.referral;
    var school = req.body.school;
    var work = req.body.work;
    var full = req.body.full;

    var msg = "null";
    clientEmail.sendEmail(email,name,firstname);
    profileEmail.sendEmail(email, name, gender, mobile, referral, school, work, full);
    res.redirect('/');
});


app.get('/invite', function(req, res){

    var hash = crypto.createHash('sha256').update(req.query.name).digest('hex');
    if(hash === req.query.id){
	res.render('invite.html',{referrer: req.query.name});
    } else{
	res.redirect('/');
    }
	

});








//localhost server
var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
