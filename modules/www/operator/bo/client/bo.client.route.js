'use strict';
const moment = require('moment');

module.exports = function(app) {
	app.get('/bo/client', async (req, res) => {
		let clients = await app.models.Client.find({
			operator: req.operator._id
		}).lean();
		clients.forEach(e => {
			e.phone = app.utils.phone.mask(e.phone);
			e.created = moment(e.created).fromNow()
		});
		res.render('bo/client', {
			layout: 'backoffice',
			clients: clients
		});
	});
};