'use strict';

module.exports = function(app) {
	app.get('/admin/user', (req, res) => {
		res.render('admin.user', {
			layout: 'admin'
		});
	});
};