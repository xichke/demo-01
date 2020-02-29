'use strict';

module.exports = function(app) {
	app.get('/admin', (req, res) => {
		res.render('admin', {
			layout: 'admin'
		});
	});
};