const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {

    // Match Email user
    const user = await User.findOne({email})
    if (!user){
        return done(null, false, {message:'No User Found'});
    } else {
        // match password user
        const match = await user.matchPassword(password);

        if (match){
            return done(null, user);
        } else {
            return done(null, false, {message: 'Incorrect Password'})
        }
    }

})) 

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    return done (null, user);
});
