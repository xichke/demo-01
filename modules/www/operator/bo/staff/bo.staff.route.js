'use strict';

module.exports = function(app) {
	app.get('/bo/staff', (req, res) => {
		res.render('bo/staff', {
			layout: 'backoffice',
			staffs: req.operator.staffs
		});
	});

	app.post('/bo/staff', async (req, res, next) => {
		try {
			let operator = await app.models.Operator.findOneAndUpdate(req.operator, {
				$push: {
					staffs: {
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
	app.delete('/bo/staff/:id', async (req, res, next) => {
		try {
			let operator = await app.models.Operator.findOneAndUpdate(req.operator, {
				$pull: {
					staffs: {
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