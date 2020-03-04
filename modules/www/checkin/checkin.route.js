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
				}).lean(),
				nuser = await app.models.NUser.findOne({
					phone: phone
				}, '_id phone name').lean();
			if (!nuser) {
				nuser = await new app.models.NUser({
					phone: phone
				}).save();
			}
			console.log(nuser);
			let transaction = await app.models.Transaction({
				nUserId: nuser._id,
				salonId: salon._id
			}).save();
			res.json({
				success: true,
				message: `Welcome ${nuser.name ? nuser.name : ''} to ${salon.name}. <br/> You checked in successfully.`,
				point: ''
			});
		} catch (err) {
			res.status(500).send({
				success: false
			});
		}
	});
};