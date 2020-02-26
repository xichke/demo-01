'use strict';
var path = require('path'),
	config = require('config'),
	mongoose = require('mongoose'),
	jwt = require('jsonwebtoken'),
	User = mongoose.model('User');

exports.create = (data) => {
	(async () => {
		var item = new User(data);
		await item.save();
	})().catch(err => {
		throw err;
	});
}

exports.verify = (token) => {
	// jwt.verify(token, config.token.secret, (err, result) => {
	// 	console.log('=====>>> verify : ', err, result);
	// 	return result;
	// });
	return jwt.verify(token, config.token.secret, {
		
	});
}

// exports.read = function(req, res) {
//   Model.find().sort('-created').exec(function(err, articles) {
//     if (err) {
//       throw new Error(err);
//     } else {
//       res.json(articles);
//     }
//   });
// };
// exports.update = function(req, res) {
//   var item = req.user;
//   article.title = req.body.title;
//   article.content = req.body.content;
//   article.save(function(err) {
//     if (err) {
//       throw new Error(err);
//     } else {
//       res.json(article);
//     }
//   });
// };
// exports.delete = function(req, res) {
//   var article = req.article;
//   article.remove(function(err) {
//     if (err) {
//       throw new Error(err);
//     } else {
//       res.json(article);
//     }
//   });
// };