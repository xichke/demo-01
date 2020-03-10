const mongoose = require('mongoose'),
	path = require('path'),
	utils = require('./utils'),
	config = require('config');

module.exports = function(app) {
	utils.match('modules/**/*.model.js').forEach(function(e) {
		require(path.resolve(e));
	});
	app.models = mongoose.models;
	mongoose.Promise = Promise;
	mongoose.set('debug', config.db.debug);
	mongoose.set('useFindAndModify', false);
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
		await mongoose.connect(config.db.uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		});
	})();
};