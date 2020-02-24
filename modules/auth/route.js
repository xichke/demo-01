'use strict';
const service = require('./user.service'),
	mongoose = require('mongoose'),
	Service = require('./user.service'),
	User = mongoose.model('User');

module.exports = function(app) {
	let passport = app.get('passport');
	// app.get('/login', function(req, res) {
	// 	if (req.isAuthenticated())
	// 		return res.redirect('/map');
	// 	res.render('login', {
	// 		layout: false
	// 	});
	// });
	// app.post('/login', function(req, res, next) {
	// 	passport.authenticate('mysql', (err, user) => {
	// 		if (err) {
	// 			res.send({
	// 				success: false,
	// 				message: err
	// 			});
	// 		} else {
	// 			res.send({
	// 				success: true,
	// 				redirect: '/login'
	// 			});
	// 		}
	// 	})(req, res, next);
	// });
	app.post('/user', function(req, res, next) {
		console.log('#1 : ', req.body);
		service.create(req.body);
		console.log('#2 : ', req.body);
		res.send();
	});
	app.get('/user', async (req, res, next) => {
		console.log('#1 : ', req.headers);
		try {
			let result = await Service.verify(req.headers['authorization'].replace(/^JWT\s/, ''));
			console.log('#2 : ', result);
		} catch (err) {
			console.log('err ==>>>> ', err.stack);
		}
		
		res.send();
	});
	app.post('/login', async (req, res, next) => {
		console.log('#1 : ', req.body);
		let user = await User.findOne({
			username: req.body.username
		}).exec();
		if (user) {
			if (user.authenticate(req.body.password)) {
				return res.json(user.toAuthJSON());
			} else {
				console.log('# wrong password ');
			}
		} else {
			console.log('# wrong username ');
		}
		res.send();
	});
};