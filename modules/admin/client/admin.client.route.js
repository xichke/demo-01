'use strict';

module.exports = function(app) {
	app.get('/admin/client', async (req, res) => {
		let clients = await app.models.client.find({}, '-password -__v').lean();
		res.render('admin/client', {
			layout: 'admin',
			clients: clients
		});
	});
	app.get('/admin/client/create', (req, res) => {
		res.render('admin.client/edit', {
			layout: 'admin',
			id: '',
			client: '{}'
		});
	});
	app.get('/admin/client/edit/:id', async (req, res) => {
		try {
			let client = await app.models.client.findOne({
				_id: req.params.id
			}, '-password -__v').lean();
			if (!client) {
				return res.status(404).send('not found');
			}
			res.render('admin.client/edit', {
				layout: 'admin',
				id: `${req.params.id}`,
				client: JSON.stringify(client)
			});
		} catch (err) {
			res.status(500).send(err);
		}
	});
};