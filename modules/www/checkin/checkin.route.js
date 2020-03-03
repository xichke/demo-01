'use strict';
const libphone = require('libphonenumber-js');

module.exports = function(app) {
	app.get('/checkin', (req, res) => {
		// if (!req.isAuthenticated())
		// 	return res.redirect(`/login?ref=${req.originalUrl}`);
		res.render('checkin', {
			layout: 'client'
		});
	});
	app.post('/checkin', async (req, res) => {
		try {
			let phone = libphone
				.parsePhoneNumberFromString(req.body.phone, 'US')
				.format('E.164');
			let salon = await app.models.Salon.findOne({
				admin: req.user._id
			}).lean();
			let nuser = await app.models.NUser.findOne({
				phone: phone
			}).lean();
			if (!nuser) {
				new app.models.NUser({
					phone: phone
				}).save();
				return res.status(201).json({
					success: true
				});
			}
			res.json({
				success: true
			});
		} catch (err) {
			res.status(500).send({
				success: false
			});
		}
	});
};