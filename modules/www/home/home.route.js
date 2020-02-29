'use strict';
const mongoose = require('mongoose'),
	User = mongoose.model('User');

module.exports = function(app) {
	app.get('/', (req, res, next) => {
		console.log(req.isAuthenticated(), req.user);
		res.send('hi');
	});
};