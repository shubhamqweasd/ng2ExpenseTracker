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
				if(!err) res.status(200).json({success:true})
					else res.status(500).json({success:false,message:err})
			})
		} else res.status(400).json({success:false,message:'INVALID REQ PARAMETERS'})
	})

	router.get('/created/:startDate/:endDate',function(req,res){
		var searchQuery = {}
		if(req.user.role == 'user'){
			searchQuery.created_by = req.user.email
		}
		Expense.find(searchQuery,function(err,data){
			if(!err){
				if(req.params.startDate != 'false' && req.params.endDate != 'false'){
					console.log('-----------------------')
					data = data.filter(function(x){
				    	return getDateString(Date.parse(x.created_on)) >= getDateString(Date.parse(req.params.startDate)) && getDateString(Date.parse(x.created_on)) <= getDateString(Date.parse(req.params.endDate))
				    })
				}
				res.status(200).json({success:true,data:data})
			} else res.status(500).json({success:false,message:err})
		})
		
	})

	router.delete('/delete/:id',function(req,res){
		Expense.findOne({_id:req.params.id},function(err,data){
			Expense.remove({_id:req.params.id},function(err){
				if(!err) res.status(200).json({success:true})
					else res.status(500).json({success:false,message:err})
			})
		})
	})

	router.put('/edit/:id',function(req,res){
		delete req.body.created_by
		delete req.body.created_on
		var toValidate = ['amount','comment','description']
		if(validateRequest(toValidate,req)){
			Expense.update({_id:req.params.id},req.body,function(err,num){
				if(!err) res.status(200).json({success:true,num:num})
					else res.status(500).json({success:false,message:err})
			})
		} else res.status(400).json({success:false,message:'INVALID REQ PARAMETERS'})
	})

	return router
}

function isLoggedIn(req, res, next) {

    //if user is authenticated in the session, carry on
    if (req.isAuthenticated())
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

function getDateString(date){
  	if(date != NaN){
  		date = new Date(date)
  		return date.getTime()
  	}
  	return false
}
