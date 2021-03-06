var router = require('express').Router();
var User = require('../app/models/user');
var bcrypt   = require('bcrypt-nodejs');

module.exports = function(){
	// auth for every request in this module
	router.use(isLoggedIn)

	router.get('/users',function(req,res){
		User.find({},function(err,data){
			if(!err){
				if(req.user.role == 'manager'){
					data = data.filter(function(x){
						return x.role == 'user'
					})
				}
				if(req.user.role == 'admin'){
					data = data.filter(function(x){
						return x.email != req.user.email
					})
				}
				res.status(200).json({success:true,data:data})
			}
				else res.status(500).json({success:false,message:err})
		})
	})

	router.delete('/delete/:id',function(req,res){
		User.remove({_id:req.params.id},function(err){
			if(!err) res.status(200).json({success:true})
				else res.status(500).json({success:false,message:err})
		})
	})

	router.put('/edit/:id',function(req,res){
		var toValidate = ['email','name','role']
		if(validateRequest(toValidate,req)){
			if(req.body.password){
				req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null)
			}
			if(req.user.role == 'manager'){
				delete req.body.role
			}
			User.update({_id:req.params.id},req.body,function(err,num){
				if(!err) res.status(200).json({success:true,num:num})
					else res.status(500).json({success:false,message:err})
			})
		} else res.status(401).json({success:false,message:'INVALID REQ PARAMETERS'})
	})

	
	return router
}

function isLoggedIn(req, res, next) {

    //if user is authenticated in the session, carry on
    if (req.isAuthenticated() && (req.user.role == 'admin' || req.user.role == 'manager'))
        return next();

    res.status(403).json({success:false,message:"NOT AUTHORISED"});
}

function validateRequest(arr,req){
	for(var k in arr){
		if(req.body[arr[k]] == undefined || req.body[arr[k]] == null || req.body[arr[k]] == ''){
			return false
		}
	}
	return true
}
