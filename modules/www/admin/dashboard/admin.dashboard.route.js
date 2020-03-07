'use strict';

module.exports = function(app) {
	app.get('/admin/dashboard', (req, res) => {
		res.render('admin/dashboard', {
			layout: 'admin'
		});
	});
};