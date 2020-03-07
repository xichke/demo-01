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
				phone = libphone.parsePhoneNumberFromString(req.body.phone, 'US').format('E.164');
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
			app.io.emit('checkin', transaction);
			res.json({
				success: true,
				message: `Welcome ${client.name ? client.name : ''} to ${operator.name}. <br/> You checked in successfully.`,
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