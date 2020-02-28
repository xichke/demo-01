'use strict';
const mongoose = require('mongoose'),
	User = mongoose.model('User');

module.exports = function(app) {
	app.get('/', async (req, res, next) => {
		console.log(req.session.error);
		req.session.error = new Date();

		console.log(mongoose.models.User);
		res.send();
	});
};