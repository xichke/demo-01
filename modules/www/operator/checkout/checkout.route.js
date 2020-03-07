'use strict';

module.exports = (app) => {
	app.get('/checkout', (req, res, next) => {
		res.render('checkout', {
			layout: 'admin',
			operator: req.operator._id
		});
	});
	app.post('/checkout/:operator', async (req, res, next) => {
		try {
			let transactions = await app.models.Transaction.find({
				operator: req.params.operator
			}).today().populate('client').lean();
			transactions.forEach(e => {
				e.client.phone = app.utils.phone.mask(e.client.phone);
			});
			res.json({
				transactions: transactions
			})
		} catch (err) {
			next(err);
		}
	});
};