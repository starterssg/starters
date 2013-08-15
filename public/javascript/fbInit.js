$(function(){
    $(".popup").click(function(){
	$(".signUpWrapper").show();
	$(".dimmer").show();
    });
    
    $(".dimmer").click(function(){
	$(".dimmer").hide();
	$(".signUpWrapper").hide();
    });
});

try{
    document.execCommand('BackgroundImageCache', false, true);
}catch(e){
}

window.fbAsyncInit = function() {
    FB.init({
	appId      : '166384400201584', // App ID
	channelUrl : '//www.starters-singapore.com/channel.html', // Channel File
	status     : true, // check login status
	cookie     : true, // enable cookies to allow the server to access the session
	xfbml      : true  // parse XFBML
    });
  };


function login(){
    FB.login(function(response) {
	if (response.authResponse) {
	    getInfo();
        } else {
	    window.location = "http://www.starters-singapore.com";
        }
    }, {scope: 'email,user_education_history,user_work_history'}); //permissions
}

// Load the SDK asynchronously
(function(d){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));

function getInfo() {
    document.getElementById('email').value = document.getElementById('email1').value;
    alert('alert1');
    FB.api('/me', function(response) {
	alert('alert2')
	postInfo(response);
    });
}

//posts information from hidden form
function postInfo(response) {
    alert("Thanks for signing up! We'll be in touch with you soon.");
    if(document.getElementById('email1').value === ""){
	document.getElementById('email').value = response.email;
    }else{
	document.getElementById('email').value = document.getElementById('email1').value;
    }
    document.getElementById('name').value = response.name;
    document.getElementById('firstname').value = response.first_name;
    document.getElementById('gender').value = response.gender;
    document.getElementById('mobile').value = document.getElementById('mobile1').value;
    document.getElementById('referral').value = document.getElementById('referral1').value;
    
    if(response.education){
	document.getElementById('school').value = JSON.stringify(response.education);
    }
    if(response.work){
	document.getElementById('work').value = JSON.stringify(response.work);
    }
    document.getElementById('full').value = JSON.stringify(response);
    document.getElementById("fbInfo").submit();   
}
