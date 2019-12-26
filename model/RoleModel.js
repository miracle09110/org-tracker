var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roleSchema = new Schema({
    _id : Number,
    name: String
}, {collection :'user'})


var RoleModel = mongoose.model('role',roleSchema);
module.exports = RoleModel;