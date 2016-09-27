var mongoose = require('mongoose'); 

var expense = mongoose.Schema({
    description     : String,
    created_on      : Date,
    amount          : Number,
    comment 		: String,
    created_by      : String
});

module.exports = mongoose.model('expense',expense);