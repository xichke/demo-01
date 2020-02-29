'use strict';

module.exports = function(app) {
	app.get('/admin/salon', (req, res) => {
		res.render('admin.salon', {
			layout: 'admin'
		});
	});
};