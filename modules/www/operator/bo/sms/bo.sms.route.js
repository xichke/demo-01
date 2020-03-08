'use strict';

module.exports = function(app) {
	app.get('/bo/sms', (req, res) => {
		res.render('bo/sms', {
			layout: 'backoffice'
		});
	});
};