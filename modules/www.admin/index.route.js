'use strict';

module.exports = function(app) {
	app.get('/admin', async (req, res) => {
		try {
			res.render('www.admin', {
				layout: 'admin',
				count: {
					user: await app.models.User.countDocuments({}).lean(),
					operator: await app.models.Operator.countDocuments({}).lean(),
					client: await app.models.Client.countDocuments({}).lean(),
					transaction: await app.models.Transaction.countDocuments({}).lean()
				}
			});
		} catch (err) {

		}
	});
};