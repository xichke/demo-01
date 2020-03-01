'use strict';

module.exports = function(app) {
	app.get('/admin/user', (req, res) => {
		res.render('admin.user', {
			layout: 'admin'
		});
	});
	app.get('/admin/user/edit', (req, res) => {
		res.render('admin.user/edit', {
			layout: 'admin'
		});
	});
	app.get('/admin/user/create', (req, res) => {
		res.render('admin.user/edit', {
			layout: 'admin'
		});
	});
};