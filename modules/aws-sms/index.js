const config = require('config'),
	AWS = require('aws-sdk'),
	sns = new AWS.SNS();

AWS.config.update({
	region: 'us-east-1',
	accessKeyId: config.sns.key,
	secretAccessKey: config.sns.secret
});

let send = (to, message, done) {
	sns.publish({
		PhoneNumber: to,
		Message: message,
	}, (err, data) => {
		if (err) {
			console.error(err, err.stack);
		} else {
			console.log("MessageID is " + data.MessageId);
		}
	});
}