'use strict';
const mongoose = require('mongoose');

module.exports = function(app) {
	app.get('/checkin', (req, res) => {
		// if (!req.isAuthenticated())
		// 	return res.redirect(`/login?ref=${req.originalUrl}`);
		res.render('checkin', {
			layout: 'client'
		});
	});
	app.post('/checkin', (req, res) => {
		// let item = app.models.
		if (!err) {
			res.send({
				success: true,
				redirect: req.query.ref || '/'
			});
		} else {
			res.send({
				success: false
			});
		}
	});
};