'use strict';

module.exports = function(app) {
	app.get('/bo/service', (req, res) => {
		res.render('bo/service', {
			layout: 'backoffice',
			services: JSON.stringify(req.operator.services || [])
		});
	});

	app.post('/bo/service', async (req, res, next) => {
		try {
			req.body = req.body.filter(e => e.name);
			req.body.forEach(e => e.services = e.services.filter(x => x.name));
			let operator = await app.models.Operator.findOneAndUpdate(req.operator, {
				$set: {
					services: req.body
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