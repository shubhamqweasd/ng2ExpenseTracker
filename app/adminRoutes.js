var router = require('express').Router();
var User = require('../app/models/user');
var bcrypt   = require('bcrypt-nodejs');

module.exports = function(){
	// auth for every request in this module
	router.use(isLoggedIn)

	router.get('/users',function(req,res){
		User.find({},function(err,data){
			if(!err) res.json({success:true,data:data})
				else res.json({success:false,message:err})
		})
	})

	router.delete('/delete/:id',function(req,res){
		User.remove({_id:req.params.id},function(err){
			if(!err) res.json({success:true})
				else res.json({success:false,message:err})
		})
	})

	router.put('/edit/:id',function(req,res){
		var toValidate = ['email','name','role']
		if(validateRequest(toValidate,req)){
			if(req.body.password){
				req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null)
			}

			User.update({_id:req.params.id},req.body,function(err,num){
				if(!err) res.json({success:true,num:num})
					else res.json({success:false,message:err})
			})
		} else res.json({success:false,message:'INVALID REQ PARAMETERS'})
	})

	
	return router
}

function isLoggedIn(req, res, next) {

    //if user is authenticated in the session, carry on
    if (req.isAuthenticated() && req.user.role == 'admin')
        return next();

    res.json({success:false,message:"NOT AUTHORISED"});
}

function validateRequest(arr,req){
	for(var k in arr){
		if(req.body[arr[k]] == undefined || req.body[arr[k]] == null || req.body[arr[k]] == ''){
			return false
		}
	}
	return true
}
