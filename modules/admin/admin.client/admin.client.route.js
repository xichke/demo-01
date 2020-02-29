'use strict';

module.exports = function(app) {
	app.get('/admin/client', (req, res) => {
		res.render('admin.client', {
			layout: 'admin'
		});
	});
};