var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
module.exports = { 
	mail:function(data, callback){
		try{
			var source = data.email.trim();
			var name = data.name.trim();
			var message = data.message.trim();
			var phone = data.phone.trim();
			if(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(source) && /^[789]\d{9}$/.test(phone) && name!='' && message!=''){
				var transporter = nodemailer.createTransport('smtps://ansh%2Evengaboyz%40gmail.com:9999504540@smtp.gmail.com');
				// setup e-mail data with unicode symbols
				message = "Name: "+name+"\n\n"+"Source: "+source+"\n\n"+"Phone: "+phone+"\n\n"+"Message: "+message;
				var mailOptions = {
				    from: '"'+name+'"<'+source+'>"',
				    to: 'ansh.vengaboyz@gmail.com', // list of receivers
				    subject: 'Message', // Subject line
				    text: message,
				};

				// send mail with defined transport object
				transporter.sendMail(mailOptions, function(error, info){
				    if(error){
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