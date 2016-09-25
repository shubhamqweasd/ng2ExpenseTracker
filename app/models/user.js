var mongoose = require('mongoose'); 

var user = mongoose.Schema({
    email        : String,
    name         : String,
    password     : String
});

module.exports = mongoose.model('user',user);