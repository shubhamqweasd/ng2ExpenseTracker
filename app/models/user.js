var mongoose = require('mongoose'); 

var user = mongoose.Schema({
    email        : String,
    name         : String,
    password     : String,
    role		 : String
});

module.exports = mongoose.model('user',user);