'use strict';

module.exports = (app) => {
	app.get('/checkout', (req, res, next) => {
		res.render('checkout', {
			layout: 'operator',
			operator: req.operator._id
		});
	});
	app.get('/checkout/transactions/:operator', async (req, res, next) => {
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

	app.post('/checkout/inprogerss/:transaction', async (req, res, next) => {
		try {
			let transaction = await app.models.Transaction.findOneAndUpdate({
				_id: req.params.transaction
			}, {
				inProgress: new Date()
			}).populate('client').lean();
			res.json({
				inProgress: new Date()
			})
		} catch (err) {
			next(err);
		}
	});
	
};