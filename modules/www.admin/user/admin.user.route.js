'use strict';

module.exports = function(app) {
	app.get('/admin/user', async (req, res) => {
		let users = await app.models.User.find({}, '-password -__v').lean();
		res.render('admin/user', {
			title: 'User Management',
			layout: 'admin',
			users: users
		});
	});
	app.get('/admin/user/create', (req, res) => {
		res.render('admin/user/edit', {
			layout: 'admin',
			id: '',
			user: '{}'
		});
	});
	app.get('/admin/user/:id', async (req, res, next) => {
		try {
			let user = await app.models.User.findOne({
				_id: req.params.id
			}, '-password -__v').lean();
			if (!user) {
				return res.status(404).send('not found');
			}
			res.render('admin/user/edit', {
				layout: 'admin',
				id: `${req.params.id}`,
				user: JSON.stringify(user)
			});
		} catch (err) {
			throw err;
			next(err);
			// res.status(500).send(err);
		}
	});
};