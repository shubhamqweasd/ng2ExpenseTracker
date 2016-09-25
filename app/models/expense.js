var mongoose = require('mongoose'); 

var expense = mongoose.Schema({
    description     : String,
    created_on      : Date,
    amount          : String,
    comment 		: String,
    created_by      : String
});

module.exports = mongoose.model('expense',expense);