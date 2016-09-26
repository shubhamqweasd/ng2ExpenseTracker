var router = require('express').Router();
var Expense = require('../app/models/expense');
var User = require('../app/models/user');

module.exports = function(){
	// auth for every request in this module
	router.use(isLoggedIn)

	router.post('/add',function(req,res){

		var toValidate = ['amount','comment','description']
		if(validateRequest(toValidate,req)){
			var newTask = new Expense()
			newTask.created_by = 	req.user.email
			newTask.amount = 		req.body.amount
			newTask.comment = 		req.body.comment
			newTask.description = 	req.body.description
			newTask.created_on = 	new Date()
			newTask.save(function(err){
				if(!err) res.json({success:true})
					else res.json({success:false,message:err})
			})
		} else res.json({success:false,message:'INVALID REQ PARAMETERS'})
	})

	router.get('/created',function(req,res){
		Expense.find({created_by:req.user.email},function(err,data){
			if(!err) res.json({success:true,data:data})
				else res.json({success:false,message:err})
		})
	})

	router.delete('/delete/:id',function(req,res){
		Expense.findOne({_id:req.params.id},function(err,data){
			if(req.user.email == data.created_by){
				Expense.remove({_id:req.params.id},function(err){
					if(!err) res.json({success:true})
						else res.json({success:false,message:err})
				})
			} else {
				res.json({success:false,message:"NOT AUTHORISED"})
			}
		})
	})

	router.put('/edit/:id',function(req,res){
		delete req.body.created_by
		delete req.body.created_on
		var toValidate = ['amount','comment','description']
		if(validateRequest(toValidate,req)){
			Expense.update({_id:req.params.id},req.body,function(err,num){
				if(!err) res.json({success:true,num:num})
					else res.json({success:false,message:err})
			})
		} else res.json({success:false,message:'INVALID REQ PARAMETERS'})
	})

	return router
}

function isLoggedIn(req, res, next) {

    //if user is authenticated in the session, carry on
    if (req.isAuthenticated())
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
