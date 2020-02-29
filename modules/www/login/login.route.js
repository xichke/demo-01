'use strict';
const mongoose = require('mongoose');

module.exports = (app) => {
	app.get('/login', (req, res) => {
		res.render('login', {
			layout: 'client',
			err: error
		});
	});
	app.post('/login', (req, res, next) => {
		app.get('passport').authenticate('mongo', (err, user) => {
			if (!err) {
				// console.log('===>>>', req.query);
				// res.redirect(req.query.ref || '/');
				res.send({
					success: true,
					redirect: req.query.ref || '/'
				});
			} else {
				// req.session.error = err.message;
				// res.redirect('/login');
				res.send({
					success: false,
					message: err
				});
			}
		})(req, res, next);
	});
};