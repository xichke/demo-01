'use strict';
const libphone = require('libphonenumber-js');

module.exports = function(app) {
	app.get('/checkin', (req, res) => {
		res.render('checkin', {
			layout: 'client'
		});
	});
	app.post('/checkin', async (req, res) => {
		try {
			let operator = req.operator,
				phone = libphone.parsePhoneNumberFromString(req.body.phone, 'US').format('E.164'),
				client = await app.models.Client.findOne({
					operator: operator._id,
					phone: phone
				}).lean();
			if (!client) {
				client = await new app.models.Client({
					operator: operator._id,
					phone: phone
				}).save();
			}
			let transaction = await new app.models.Transaction({
				operator: operator._id,
				client: client._id
			}).save();

			//broadcast to checkout
			let _ts = await app.models.Transaction.findOne(transaction).populate('client').lean();
			if (_ts) {
				_ts.client.phone = app.utils.phone.mask(_ts.client.phone);
				app.io.to(operator._id).emit('checkin', _ts);
			}
			
			res.json({
				success: true,
				operator: operator.name,
				order: transaction.order,
				point: ''
			});
		} catch (err) {
			throw err;
			res.status(500).send({
				success: false
			});
		}
	});
};