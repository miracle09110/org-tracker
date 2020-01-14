var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivitySchema = new Schema({
    _id: String,
    event_name: String,
    venue: String,
    image_base_64: String,
    start_date: String,
    end_date: String,
    start_time: String,
    end_time: String,
    description: String
});

var ActivityModel = mongoose.model('activity',ActivitySchema);
module.exports = ActivityModel;
