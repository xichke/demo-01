'use strict';
const mongoose = require('mongoose');

module.exports = function(app) {
	app.route('/login')
		.get((req, res) => {
			res.render('login', {
				layout: 'client'
			});
		})
		.post((req, res) => {
			res.json({});
		});
};