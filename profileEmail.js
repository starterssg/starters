var nodemailer = require("nodemailer");

function sendEmail(email, name, gender, mobile, referral, school, work, full){

    var smtpTransport = nodemailer.createTransport("SMTP",{
	host: 'mail.gandi.net',
	port: 587,
	use_authentication: true,
	user: "geoffrey@starters-singapore.com",
	pass: "deutschebank"
    });
    
    smtpTransport.sendMail({
	from: "Starters <geoffrey@starters-singapore.com>",
	to: "Starters <starters@starters-singapore.com>",
	subject: "New Signup:" + name,
	text: "email: " + email + "\n\nname: " + name + "\n\ngender: " + gender + "\n\nmobile: " + mobile + "\n\nreferral: " + referral + "\n\nschool: " + school + "\n\nwork: " + work + "\n\nfull: " + full,
    }, function(error, response){
	if(error){
	} else{
	}
    });
}

exports.sendEmail = sendEmail;
