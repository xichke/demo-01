'use strict';
const utils = require('../../shared/utils');

module.exports = (app) => {
	app.get('/checkout', async (req, res) => {
		// if (!req.isAuthenticated())
		//     return res.redirect(`/login?ref=${req.originalUrl}`);
		try {
			let operator = await app.models.Operator.findOne({
				manager: req.user._id
			}).lean();
			console.log('=====>>> operator ', operator);

			let transactions = await app.models.Transaction.find({
				operator: operator._id
			}).today().populate('client').lean();

			transactions.forEach(e => {
				e.client.phone = utils.maskPhoneNumber(e.client.phone);
			});
			console.log('=====>>> transactions ', transactions);

			res.render('checkout', {
				layout: 'admin',
				transactions: transactions
			});
		} catch (err) {
			throw err;
			res.render('checkout', {
				layout: 'admin',
				error: err
			});
		}
	});
};