'use strict';

module.exports = function(app) {
	app.get('/ping', function(req, res) {
		res.status(200).send();
	});
};