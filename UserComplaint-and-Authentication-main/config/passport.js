// config/passport.js
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const Staff = require('../models/staff');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

passport.use('jwt', new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const id = jwt_payload.id;
        const staff = await Staff.findById(id);
        if (staff) return done(null, staff);
        const user = await User.findById(id);
        if (user) return done(null, user);
        return done(null, false);
    } catch (err) {
        return done(err, false);
    }
}));

module.exports = passport;
