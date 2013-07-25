//Module dependencies
var express = require("express");
var consolidate = require("consolidate");
var http = require("http");
var swig = require('swig');
var crypto = require('crypto');
var clientEmail = require("./node_modules/helper_modules/clientEmail");
var profileEmail = require("./node_modules/helper_modules/profileEmail");
var inviteEmail = require("./node_modules/helper_modules/inviteEmail");
var logEmail = require("./node_modules/helper_modules/logEmail");

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

app.get('/faq', function(req,res){
    res.render('faq.html', {});
});

app.get('/invite', function(req, res){

    var hash = crypto.createHash('sha256').update(req.query.name).digest('hex');
    if(hash === req.query.id || req.query.id === 'deutschebank'){
	res.render('invite.html',{referrer: req.query.name});
    } else{
	res.redirect('/');
    }
});
	
app.post('/invite', function(req,res){
    
    var host = req.query.name;    
    if(req.body.email1){
	inviteEmail.sendEmail(req.body.email1, req.body.name1, host);
    }
    if(req.body.email2){
	inviteEmail.sendEmail(req.body.email2, req.body.name2, host);
    }   
    if(req.body.email3){
	inviteEmail.sendEmail(req.body.email3, req.body.name3, host);
    }
    if(req.body.email4){
	inviteEmail.sendEmail(req.body.email4, req.body.name4, host);
    }
    logEmail.sendEmail(host, req.body.email1, req.body.name1, req.body.email2, req.body.name2, req.body.email3, req.body.name3, req.body.email4, req.body.name4);
    res.redirect('/');
});

app.get('/invitation', function(req,res){
    
});
    
    
    
    
 
//localhost server
var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
