var mongoose = require('mongoose');
var Promise = require("bluebird");

var Schema = mongoose.Schema;

var contactSchema = new Schema({
    name: {type: String, default: ''},
    nameFirstWordChr: {type: String, default: ''},
    nameAllWordChr: {type: String, default: ''},
    corp: {type: String, default: ''},
    mobilePhone: {type: String, default: ''},
    mail: {type: String, default: ''},
    createdAt: {type: Date, default: Data.now()},
    lastModify: {type: Date, default: Data.now()}
});

contactSchema.static('save', function (contact) {
    var self = this;

    return new Promise(function (resolve, reject) {
        self.create(contact, function (err, data) {
            if (err) return reject(err);
            return resolve(data);
        });
    })
});

contactSchema.static('findContacts', function (filter, fields) {
    var self = this;

    return new Promise(function (resolve, reject) {
        self.find(filter, fields, {})
            .exec(function (err, data) {
                if(err) return reject(err);
                return resolve(data);
        });
    });
});

module.exports = db.model('contact', contactSchema,"contacts");