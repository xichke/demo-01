'use strict';

module.exports = function(app) {
	app.get('/bo/review', (req, res) => {
		res.render('bo/review', {
			layout: 'backoffice'
		});
	});
};