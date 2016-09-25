var User = require('../app/models/user');
var router = require('express').Router();
var bcrypt   = require('bcrypt-nodejs');

module.exports = function(passport){

    // ================ LOCAL SIGNUP AND LOGIN ROUTES ===================//
    router.post('/login/local',function(req,res){
    	passport.authenticate('local-login', authHandlerLocal(req,res))(req,res)
    });
    router.post('/signup/local',function(req,res){
    	if(req.body.email && req.body.password && req.body.name){
    		User.findOne({email:req.body.email},function(err,data){
    			if(err) res.json({"success":false,"message":"Somthing went wrong try again"})
    			if(data) res.json({"success":false,"message":"User with same username/email already exists."})
   					else {
						var newUser = new User();
			    		newUser.email = req.body.email
			    		newUser.name = req.body.name
			    		newUser.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null)
			    		newUser.save(function(err){
			    			if(err) res.json({"success":false,"message":"SOmthing went wrong try again"})
			    				res.json({"success":true})
			    		})
		    		}
    		})
    	} else res.json({"success":false,"message":"Wrong format of request"})
    })

    // ============= OTHER ROUTES FOR AUTH PURPOSES =======================//
    router.get('/profile', isLoggedIn, function(req, res) {
        res.json({success:true,data:req.user});
    });

    router.get('/logout', function(req, res) {
        req.logout();
        res.json({"success":true})
    });

	return router;
};

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    res.json({success:false,message:"NOT AUTHORISED"});
}

function authHandlerLocal(req,res){
	return function(err, user, info) {
	    if (err) return res.json({success:false,message:info.message})
	    if (!user) return res.json({success:false,message:info.message});
	    req.logIn(user, function(err) {
	      if (err) return res.json({"success":false,"message":"Somthing went wrong try again"})
	      return res.json({"success":true})
	    });
	 }
}