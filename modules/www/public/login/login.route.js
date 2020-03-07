'use strict';
const mongoose = require('mongoose');

module.exports = (app) => {
	app.get('/login', (req, res) => {
		res.render('login', {
			layout: 'client',
			ref: req.query.ref
		});
	});
	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});
	app.post('/login', (req, res, next) => {
		app.get('passport').authenticate('mongo', (err, user) => {
			if (!err) {
				res.send({
					success: true
				});
			} else {
				res.send({
					success: false
				});
			}
		})(req, res, next);
	});
};