'use strict';

module.exports = function(app) {
	app.get('/bo/service', (req, res) => {
		res.render('bo/service', {
			layout: 'backoffice',
			services: req.operator.services
		});
	});

	app.post('/bo/service/category', async (req, res, next) => {
		try {
			let operator = await app.models.Operator.findOneAndUpdate(req.operator, {
				$push: {
					services: {
						name: req.body.name
					}
				}
			}).lean();
			res.json({
				success: true
			});
		} catch (err) {
			next(err);
		}
	});

	app.post('/bo/service', async (req, res, next) => {
		try {
			let operator = await app.models.Operator.findOneAndUpdate(req.operator, {
				$push: {
					services: {
						name: req.body.name
					}
				}
			}).lean();
			res.json({
				success: true
			});
		} catch (err) {
			next(err);
		}
	});

	app.delete('/bo/service/:id', async (req, res, next) => {
		try {
			let operator = await app.models.Operator.findOneAndUpdate(req.operator, {
				$pull: {
					services: {
						_id: req.params.id
					}
				}
			}).lean();
			res.json({
				success: true
			});
		} catch (err) {
			next(err);
		}
	});
};