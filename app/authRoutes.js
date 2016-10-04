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
    			if(err) res.status(409).json({"success":false,"message":"Somthing went wrong try again"})
    			if(data) res.status(409).json({"success":false,"message":"User with same username/email already exists."})
   					else {
                        var badRole = false
						var newUser = new User();
			    		newUser.email = req.body.email
			    		newUser.name = req.body.name
                        if(req.body.role && req.user.role == 'admin'){
                            if(['admin','user','manager'].indexOf(req.body.role) == -1){
                                badRole = true
                            }
                            newUser.role = req.body.role
                        } else {
                            newUser.role = 'user'
                        }
			    		newUser.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null)
                        if(!badRole){
    			    		newUser.save(function(err){
    			    			if(err) res.status(500).json({"success":false,"message":"SOmthing went wrong try again"})
    			    				res.status(200).json({"success":true})
    			    		})
                        } else {
                            res.status(400).json({"success":false,"message":"Wrong format of request"})
                        }
		    		}
    		})
    	} else res.status(400).json({"success":false,"message":"Wrong format of request"})
    })

    // ============= OTHER ROUTES FOR AUTH PURPOSES =======================//
    router.get('/profile', isLoggedIn, function(req, res) {
        res.status(200).json({success:true,data:req.user});
    });

    router.get('/logout', function(req, res) {
        req.logout();
        res.status(200).json({"success":true})
    });

	return router;
};

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    res.status(403).json({success:false,message:"NOT AUTHORISED"});
}

function authHandlerLocal(req,res){
	return function(err, user, info) {
	    if (err) return res.status(401).json({success:false,message:info.message})
	    if (!user) return res.status(401).json({success:false,message:info.message});
	    req.logIn(user, function(err) {
	      if (err) return res.status(401).json({"success":false,"message":"Somthing went wrong try again"})
	      return res.status(200).json({"success":true,role:req.user.role})
	    });
	 }
}