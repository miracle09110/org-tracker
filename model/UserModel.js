var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    _id : String,
    password: String,
    role_id: Number,
}, {collection :'user'})


var UserModel = mongoose.model('user',userSchema);
module.exports = UserModel;