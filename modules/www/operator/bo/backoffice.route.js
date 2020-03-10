'use strict';

module.exports = function(app) {
	app.get('/bo', async (req, res) => {
		try {
			let stats = await app.models.StatsOperator.find({}).sort('date').lean();
			console.log(stats);
			res.render('bo', {
				layout: 'backoffice',
				stats: stats
			});
		} catch (err) {

		}
	});
};