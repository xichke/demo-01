const bcrypt = require('bcrypt'),
	random = function(length) {
		var text = '';
		var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (var i = 0; i < length; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		return text;
	},
	saltRounds = 10,
	plaintext = process.argv[2] || random(8);
bcrypt.hash(plaintext, saltRounds, function(err, hash) {
	console.log('plaintext : ', plaintext);
	console.log('hash : ', hash);
});