var nodemailer = require("nodemailer");

exports.sendEmail = function(firstname, email){
    var smtpTransport = nodemailer.createTransport("SMTP",{
	service: "Gmail",
	auth: {
	    user: "starterssg@gmail.com",
	    pass: "deutschebank"
	}
    });

    smtpTransport.sendMail({
	from: "Geoffrey at Starters <geoffrey@starters-singapore.com>",
	to: email,
	subject: "Kick off your Starter",
	text: "Hi " + firstname + ",\n\nThanks for signing up with us for a Starter. We're searching high and low for people who we think you and your friends will enjoy kicking the night off with, so please bear with us while we work our mojo. We'll contact you as soon as everything is set up. Thanks for signing up " + firstname + ", and please feel free to reach out to me personally if there's anything on your mind. Enjoy!  \n\nRegards,\nGeoffrey Tsui\nStarters Singapore\ngeoffrey@starters-singapore.com\n+65 91759342",
    }, function(error, response){
	if(error){
	    console.log(error);
	} else{
	    console.log("Success!");
	}
    });
}

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

    sendEmail(firstname,email);
    response.redirect('/');
});
