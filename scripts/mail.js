var nodemailer = require('nodemailer');
var setting = require('./setting')
// create reusable transporter object using the default SMTP transport
module.exports = { 
	mail:function(data, callback){
		try{
			var source = data.email.trim();
			var name = data.name.trim();
			var message = data.message.trim();
			var phone = data.phone.trim();
			if(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(source) && /^[789]\d{9}$/.test(phone) && name!='' && message!=''){
				var transporter = nodemailer.createTransport("smtps://"+setting.email+":"+setting.password);
				// setup e-mail data with unicode symbols
				message = "Name: "+name+"\n\n"+"Source: "+source+"\n\n"+"Phone: "+phone+"\n\n"+"Message: "+message;
				var mailOptions = {
				    from: '"'+name+'"<'+source+'>"',
				    to: setting.email.replace('%40','@'),
				    subject: 'Message',
				    text: message,
				};

				// send mail with defined transport object
				transporter.sendMail(mailOptions, function(error, info){
				    if(error){
				    	console.log(error, info);
				        callback(true, false, 'Cannot send email nodemailer.');
				    }
				    // console.log('Message sent: ' + info.response);
				    callback(false, true, 'Mail sent');
				});
			}else{
				callback(true, false, 'Data problem');
			}
		}catch(err){
			callback(true, false, 'Data problem');
		}
	}
}