const usersCtrl = {};
const passport = require('passport');
const user = require('../models/user');

usersCtrl.renderSignUpForm = (req,res) => {
    res.render('users/signup');
}

usersCtrl.signup = async (req,res) => {
    const errors = [];
    const { name, email, password, confirm_password} = req.body;

    if (password != confirm_password) {
        errors.push({text: 'Passwords do not match'});
    }
    if (password.length < 7) {
        errors.push({text: 'Passwords must be at least 7 characters'});
    }
    if (errors.length > 0){
        res.render('users/signup',{
            errors, 
            name,
            email,
        })
    } else {
       const emailUser = await user.findOne({email: email});
       if (emailUser){
            req.flash('error_msg', 'Email is already in use');
            res.redirect('/signup');
       } else {
            const newUser = new user({name, email, password});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'You are registered');
            res.redirect('/signin');
       }
    }
}

usersCtrl.renderSigninForm = (req,res) => {
    res.render('users/signin')
}

usersCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/signin',
    successRedirect: '/notes', 
    failureFlash: true
})

usersCtrl.logout = (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success_msg', "You are logged out now");
        res.redirect('/signin');
    });
}

module.exports = usersCtrl;