var request = require('request');
var cheerio = require('cheerio');
var psnURL = 'https://support.us.playstation.com/app/answers/detail/a_id/237/~/psn-status%3A-online';

var config = require('./config');
var twilio = require('twilio')(config.sid, config.auth);
var number = config.number;
var twilioNumber = config.twilioNumber;

var poll = setInterval(pollPSN, 10000);

function parseResponse(body){
	var $ = cheerio.load(body);	
	var status = $('#rn_AnswerText p span b').text();
	checkIfOnline(status);
}

function pollPSN(){
request.get(psnURL, function(err, res, body){
	if (res.statusCode === 200){
		parseResponse(body);
	} else {
		console.log('Didn\'t get a 200 response back from PSN');
	}
});
}

function checkIfOnline(status){
	if (status === 'Offline'){
		console.log('Twilio Is Offline');
	} else {
		twilio.messages.create({
		from: '+16473616305',
		to: number,
		body: 'psn is online'
	}, function(err, message){
			if(!err){
				console.log('Text Sent Successfully');	
			} else {
				console.log(err);
				console.log('Text Errored Yo');
			}
	});
	}
}

