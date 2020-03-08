'use strict';

module.exports = function(app) {
	app.get('/bo/service', (req, res) => {
		res.render('bo/service', {
			layout: 'backoffice'
		});
	});
};