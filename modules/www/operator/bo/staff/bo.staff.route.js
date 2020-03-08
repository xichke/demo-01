'use strict';

module.exports = function(app) {
	app.get('/bo/staff', (req, res) => {
		res.render('bo/staff', {
			layout: 'backoffice'
		});
	});
};