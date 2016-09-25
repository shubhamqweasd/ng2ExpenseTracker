var LocalStrategy   = require('passport-local').Strategy;
var User = require('../app/models/user');
var bcrypt   = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // LOCAL LOGIN STRATEGY
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { 
	        User.findOne({ email :  email }, function(err, user) {
	            if (err)
	                return done(err);

	            if (!user)
	                return done(null, false , {message:"INVALID EMAIL-ID/PASSWORD"})

	            if (!bcrypt.compareSync(password, user.password))
	                return done(null, false , {message:"INVALID EMAIL-ID/PASSWORD"})

	            // all is well, return successful user
	            return done(null, user);
	        });
       
    }));

}