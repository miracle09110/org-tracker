var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clusterSchema= new Schema({
    _id: String,
    name: String,
    parent_cluster_id: String,
    type: String
});

var ClusterModel = mongoose.model('cluster',clusterSchema);
module.exports = ClusterModel;