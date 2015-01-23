#PSN Status

Node js application to send you a text when PSN is back online
Uses the Twilio API

###Usage

First Create a config.json file
```
{
	"sid":"<YOUR TWILIO SID>",
	"auth":"<YOUR TWILIO AUTH>",
	"number":"<YOUR PHONE NUMBER>",
	"twilioNumber":"<YOUR TWILIO PHONE NUMBER>"
}
```

install ```npm install```

run ```node psn.js```

Wait patiently 