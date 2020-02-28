// 'use strict';
// const config = require('config'),
//     pjwt = require('passport-jwt'),
//     mongoose = require('mongoose'),
//     User = mongoose.model('User'),
//     opts = {
//         jwtFromRequest: pjwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
//         secretOrKey: config.token.secret,
//         issuer: config.token.issuer,
//         audience: config.token.audience
//     }

// module.exports = function(passport) {
//     passport.use('jwt', new pjwt.Strategy(opts, async (payload, done) => {
//         console.log('=========>>> payload : ', payload);
//         try {
//             const user = await User.findById(payload._id);
//             console.log('====>>> user : ', user);
//             if (!user) {
//                 return done(null, false);
//             }
//             return done(null, user);
//         } catch (e) {
//             return done(e, false);
//         }
//     }));
// };