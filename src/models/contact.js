var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


var contact = new Schema({
    id: ObjectId,
    name: String,
    corp: String,
    mobilePhone: String,
    mail: String
});