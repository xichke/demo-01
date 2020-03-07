'use strict';
const mongoose = require('mongoose');

module.exports = function(app) {
	app.get('/bo', (req, res) => {
		res.render('bo', {
			layout: 'admin'
		});
	});
};