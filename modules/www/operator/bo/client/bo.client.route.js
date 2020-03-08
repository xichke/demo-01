'use strict';

module.exports = function(app) {
	app.get('/bo/client', (req, res) => {
		res.render('bo/client', {
			layout: 'backoffice'
		});
	});
};