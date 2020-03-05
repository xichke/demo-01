'use strict';

module.exports = function(app) {
	app.get('/admin/operator', async (req, res) => {
		let operators = await app.models.Operator.find({}, '-password -__v').populate('manager').lean();
		res.render('admin/operator', {
			layout: 'admin',
			title: 'operator Management',
			operators: operators
		});
	});
	app.get('/admin/operator/create', (req, res) => {
		res.render('admin/operator/edit', {
			layout: 'admin',
			id: '',
			operator: '{}'
		});
	});
	app.get('/admin/operator/:id', async (req, res) => {
		try {
			let operator = await app.models.Operator.findOne({
				_id: req.params.id
			}, '-password -__v').lean();
			if (!operator) {
				return res.status(404).send('not found');
			}
			res.render('admin/operator/edit', {
				layout: 'admin',
				id: `${req.params.id}`,
				operator: JSON.stringify(operator)
			});
		} catch (err) {
			res.status(500).send(err);
		}
	});
};