'use strict';

module.exports = function(app) {
	app.get('/admin', async (req, res) => {
		try {
			res.render('admin', {
				layout: 'admin',
				count: {
					user: await app.models.User.countDocuments({}).lean(),
					client: await app.models.Client.countDocuments({}).lean(),
					salon: await app.models.Salon.countDocuments({}).lean(),
					transaction: await app.models.Transaction.countDocuments({}).lean(),
					nuser: await app.models.NUser.countDocuments({}).lean()
				}
			});
		} catch (err) {

		}
	});
};