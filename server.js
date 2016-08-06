var express = require('express');
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var mail = require('./scripts/mail');
var port = 5001;
var app = express();
var app_folder = "";
app.use(morgan('dev'));
if(process.env.NODE_ENV === 'prod'){
	app_folder = "/dist";
	app.use(express.static(path.join(__dirname + app_folder)));
}
else{
	app.use(express.static(__dirname));
}
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.listen(port, function(){
  console.log('Server running at port : '+port);
  console.log(__dirname + app_folder);
});

// app.get('/gallery', function (req, res) {
// 	res.sendFile(path.join(__dirname + app_folder+'/slide.html'));
// });

app.post('/message', function (req, res) {
	mail.mail(req.body, function(err, data, info){
		if(err){
			console.log(info);
			res.status(400).send(data);
			return;
		}
		res.status(200).send(data);
	});
});

app.get('*', function(req, res) {
	res.status(404).send('<h1>Page Not found.</h1>');
});
