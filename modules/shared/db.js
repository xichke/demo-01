const mongoose = require('mongoose'),
	path = require('path'),
	config = require('config');

module.exports = function(app) {
	utils = require('./utils');
	utils.match('modules/**/*.model.js').forEach(function(e) {
		require(path.resolve(e));
	});
	mongoose.Promise = Promise
	mongoose.connection.on('connected', () => {
		console.log('Connection Established');
	}).on('reconnected', () => {
		console.log('Connection Reestablished');
	}).on('disconnected', () => {
		console.log('Connection Disconnected');
	}).on('close', () => {
		console.log('Connection Closed');
	}).on('error', (err) => {
		throw new Error('DB connection error');
	});
	(async () => {
		await mongoose.connect(config.db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		});
	})()
};