var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memberSchema = new Schema({
    _id : String,
    name :{
        first_name: String,
        last_name: String,
        middle_initial: String, 
        nickname: String
    },
    contact_info : {
        email: String,
        phone_number: String,
    },
    profession: { 
        job_title: String,
        employer: String,
        field: String
    },
    batch: String,
    status: String
}, {collection :'member'})


var MemberModel = mongoose.model('member',memberSchema);
module.exports = MemberModel;