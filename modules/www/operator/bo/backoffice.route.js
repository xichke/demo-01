'use strict';

module.exports = function(app) {
	app.get('/bo', (req, res) => {
		res.render('bo', {
			layout: 'backoffice'
		});
	});
};