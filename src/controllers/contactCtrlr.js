var Promise = require('bluebird');
var contactMdl = require("../models/contactMdl.js");

var contactCtrlr = {};

contactCtrlr.save = function (reqParams) {
    var name = reqParams.body.name;
    var nameFirstWordChr = reqParams.body.nameFirstWordChr;
    var nameAllWordChr = reqParams.body.nameAllWordChr;
    var corp = reqParams.body.corp;
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

contactCtrlr.findAll = function (reqParams) {
    return new Promise(function (resolve, reject) {
        contactMdl.findContacts('', '').then(function (data) {
            resolve({result: 'done', data: data});
        }).catch(function (err) {
            reject({result: 'failed', err: err});
        });
    });
};

module.exports = contactCtrlr;
