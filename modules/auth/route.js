'use strict';
const service = require('./user.service');

module.exports = function(app) {
	let passport = app.get('passport');
	app.get('/login', function(req, res) {
		if (req.isAuthenticated())
			return res.redirect('/map');
		res.render('login', {
			layout: false
		});
	});
	app.post('/login', function(req, res, next) {
		passport.authenticate('mysql', (err, user) => {
			if (err) {
				res.send({
					success: false,
					message: err
				});
			} else {
				res.send({
					success: true,
					redirect: '/login'
				});
			}
		})(req, res, next);
	});
	app.post('/user', function(req, res, next) {
		console.log('#1 : ', req.body);
		service.create(req.body);
		console.log('#2 : ', req.body);
		res.send();
	});
};