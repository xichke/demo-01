'use strict';
const mongoose = require('mongoose'),
	User = mongoose.model('User');

module.exports = function(app) {
	app.get('/', (req, res, next) => {
		res.send('hi');
	});
};