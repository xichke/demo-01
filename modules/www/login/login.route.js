'use strict';
const mongoose = require('mongoose');

module.exports = (app) => {
	app.get('/login', (req, res) => {
		let error = req.flash('error');
		console.log('=====>>>> flash ', error);
		res.render('login', {
			layout: 'client',
			err: error
		});
	});
	app.post('/login', (req, res, next) => {
		app.get('passport').authenticate('mongo', async (err, user) => {
			if (!err) {
				console.log('===>> >', req.query);
				res.redirect(req.query.ref || '/');
			} else {
				// console.log('======>>>> err: ', err, err.message);
				// req.flash('error', err.message);
				// await req.session.save;
				req.session.error = err.message;
				res.redirect('/login');
			}
		})(req, res, next);
	});
};