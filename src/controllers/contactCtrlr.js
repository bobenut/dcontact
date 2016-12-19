var Promise = require('bluebird');
var contactMdl = require("../models/contactMdl.js");

var contactCtrlr = {};

contactCtrlr.save = function (reqParams) {
    var name = reqParams.body.name;
    var nameFirstWordChr = reqParams.body.nameFirstWordChr;
    var nameAllWordChr = reqParams.body.nameAllWordChr;
    var corp = reqParams.body.corp;
    var mobilePhone = reqParams.body.mobilePhone;
    var mail = reqParams.body.mail;
    var dateNow = new Date();
    var createAt = dateNow;
    var lastModify = dateNow;

    return new Promise(function (resolve, reject) {
        contactMdl.save({
            name: name,
            nameFirstWordChr: nameFirstWordChr,
            nameAllWordChr: nameAllWordChr,
            corp: corp,
            mail: mail,
            mobilePhone: mobilePhone,
            dateNow: dateNow,
            createAt: createAt,
            lastModify: lastModify
        }).then(function (data) {
            resolve({result: 'done', data: data});
        }).catch(function (err) {
            reject({result: 'failed', err: err});
        });
    });
};

contactCtrlr.clear = function () {
    return new Promise(function (resolve, reject) {
        contactMdl.clear().then(function (data) {
            resolve({result: 'done', data: data});
        }).catch(function (err) {
            reject({result: 'failed', err: err});
        });
    });
};

contactCtrlr.findContacts = function (reqParams) {
    reqParams = reqParams || {};
    reqParams.body = reqParams.body || {};
    reqParams.query = reqParams.query || {};
    var filter = reqParams.query.filter || reqParams.body.filter || {};
    var fields = reqParams.query.fields || reqParams.body.fields || {};
    var sort = reqParams.query.sort || reqParams.body.sort || {};

    return new Promise(function (resolve, reject) {
        contactMdl.findContacts(filter, fields, sort).then(function (data) {
            resolve({result: 'done', data: data});
        }).catch(function (err) {
            reject({result: 'failed', err: err});
        });
    });
};

contactCtrlr.removeOne = function (reqParams) {
    var contactId = reqParams.body.contactId;
    var filter = {_id: contactId};

    return new Promise(function (resolve, reject) {
        contactMdl.removeOne(filter).then(function (data) {
            resolve({result: 'done', data: data});
        }).catch(function (err) {
            reject({result: 'failed', err: err});
        });
    });
};

contactCtrlr.updateOne = function (reqParams) {
    var dateNow = new Date();
    var filter = {
        _id: reqParams.body.id
    };

    var value = {
        name: reqParams.body.name,
        nameFirstWordChr: reqParams.body.nameFirstWordChr,
        nameAllWordChr: reqParams.body.nameAllWordChr,
        corp: reqParams.body.corp,
        mobilePhone: reqParams.body.mobilePhone,
        mail: reqParams.body.mail,
        lastModify: dateNow
    };

    return new Promise(function (resolve, reject) {
        contactMdl.updateOne(filter, value).then(function (data) {
            resolve({result: 'done', data: data});
        }).catch(function (err) {
            reject({result: 'failed', err: err});
        });
    });
};

module.exports = contactCtrlr;
