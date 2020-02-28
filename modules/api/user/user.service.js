'use strict';
var path = require('path'),
	config = require('config'),
	mongoose = require('mongoose'),
	jwt = require('jsonwebtoken'),
	User = mongoose.model('User');

exports.verify = (token) => {
	// jwt.verify(token, config.token.secret, (err, result) => {
	// 	console.log('=====>>> verify : ', err, result);
	// 	return result;
	// });
	return jwt.verify(token, config.token.secret, {

	});
}