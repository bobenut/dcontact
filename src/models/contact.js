var mongoose = require('mongoose');
var Promise = require("bluebird");

var Schema = mongoose.Schema;


var contactSchema = new Schema({
    name: {type: String, default: ''},
    corp: {type: String, default: ''},
    mobilePhone: {type: String, default: ''},
    mail: {type: String, default: ''},
    createdAt : {type:Date, default: Data.now()},
    lastModify: {type:Date, default: Data.now()}
});