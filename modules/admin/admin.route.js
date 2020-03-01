'use strict';

module.exports = function(app) {
	app.get('/admin', async (req, res) => {
		try {
			let userCount = await app.models.User.countDocuments({}),
				clientCount = await app.models.Client.countDocuments({});
			res.render('admin', {
				layout: 'admin',
				userCount: userCount,
				clientCount: clientCount
			});
		} catch (err) {

		}
	});
};