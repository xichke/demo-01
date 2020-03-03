'use strict';

module.exports = function(app) {
	app.get('/admin/salon', async (req, res) => {
		let salons = await app.models.Salon.find({}, '-password -__v').lean();
		res.render('admin/salon', {
			layout: 'admin',
			title: 'Salon Management',
			salons: salons
		});
	});
	app.get('/admin/salon/create', (req, res) => {
		res.render('admin/salon/edit', {
			layout: 'admin',
			id: '',
			salon: '{}'
		});
	});
	app.get('/admin/salon/edit/:id', async (req, res) => {
		try {
			let salon = await app.models.Salon.findOne({
				_id: req.params.id
			}, '-password -__v').lean();
			if (!salon) {
				return res.status(404).send('not found');
			}
			res.render('admin/salon/edit', {
				layout: 'admin',
				id: `${req.params.id}`,
				salon: JSON.stringify(salon)
			});
		} catch (err) {
			res.status(500).send(err);
		}
	});
};