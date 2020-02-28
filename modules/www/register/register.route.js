'use strict';

module.exports = function(app) {
	app.get('/register', (req, res) => {
		res.render('register', {
			layout: 'client'
		});
	});
	app.post('/register', async (req, res) => {
		try {
			let user = await new app.models.User(req.body).save();
			res.redirect(req.query.ref || '');
		} catch (err) {
			res.redirect('/register');
		}
	});
};