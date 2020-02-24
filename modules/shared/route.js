'use strict';

function authenticated(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/login');
}

module.exports = function(app) {
	app.get('/', authenticated, function(req, res) {
		res.status(200).send();
	});
	app.get('/ping', function(req, res) {
		res.status(200).send();
	});
};