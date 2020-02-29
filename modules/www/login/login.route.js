'use strict';
const mongoose = require('mongoose');

module.exports = (app) => {
	app.get('/login', (req, res) => {
		res.render('login', {
			layout: 'client'
		});
	});
	app.post('/login', (req, res, next) => {
		app.get('passport').authenticate('mongo', (err, user) => {
			if (!err) {
				res.send({
					success: true,
					redirect: req.query.ref || '/'
				});
			} else {
				res.send({
					success: false,
					message: err
				});
			}
		})(req, res, next);
	});
};