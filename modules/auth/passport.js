const LocalStrategy = require('passport-local').Strategy,
    mysql = require('mysql'),
    bcrypt = require('bcrypt'),
    config = require('config').db_auth,
    connection = mysql.createConnection(config);
connection.query(`USE ${config.database}`);
module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        connection.query('SELECT * FROM users WHERE id = ? ', [id], (err, rows) => {
            done(err, rows[0]);
        });
    });
    passport.use('mysql',
        new LocalStrategy({
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true
            },
            function(req, username, password, done) {
                connection.query('SELECT * FROM users WHERE username = ?', [username], (err, rows) => {
                    if (err)
                        return done('Something went wrong');
                    if (!rows.length) {
                        return done('User not found');
                    }
                    let user = rows[0];
                    if (!bcrypt.compareSync(password, user.password)) {
                        return done('Wrong password');
                    }
                    req.login(user, (e) => {
                        return done(null, user);
                    });
                });
            })
    );
};