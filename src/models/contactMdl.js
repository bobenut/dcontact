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
    createdAt: {type: Date, default: Date.now()},
    lastModify: {type: Date, default: Date.now()}
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

contactSchema.static('clear', function () {
    var self = this;

    return new Promise(function (resolve, reject) {
        self.remove('', function (err, data) {
            if (err) return reject(err);
            return resolve(data);
        });
    });
});

contactSchema.static('findContacts', function (filter, fields, sort) {
    var self = this;

    return new Promise(function (resolve, reject) {
        self.find(filter, fields, {sort: sort}, function (err, data) {
            if (err) return reject(err);
            return resolve(data);
        });
    });
});

contactSchema.static('removeOne', function (filter) {
    var self = this;

    return new Promise(function (resolve, reject) {
        self.remove(filter, function (err, data) {
            if (err) return reject(err);
            return resolve(data);
        });
    });
});

contactSchema.static('updateOne', function (filter, value) {
    var self = this;

    return new Promise(function (resolve, reject) {
        self.update(filter, value, function (err, data) {
            if (err) return reject(err);
            return resolve(data);
        });
    });
});

module.exports = db.model('contact', contactSchema, "contacts");