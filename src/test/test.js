"use strict"
var mongoose = require('mongoose');
var Promiseb = require('bluebird');
require("should");
var contactCtrlr;

global.db = mongoose.createConnection('mongodb://localhost/contactmgr');
db.on("error", function (err) {
    console.log(err);
});

describe('01.contact function testing', function () {

    var saveContacts = function (reqParams) {
        return new Promiseb(function (resolve, reject) {
            contactCtrlr.save(reqParams).then(function (data) {
                resolve(data);
            }).catch(function (err) {
                reject(err);
            });
        })
    };

    var clearContacts = function () {
        return new Promiseb(function (resolve, reject) {
            contactCtrlr.clear().then(function (data) {
                resolve(data);
            }).catch(function (err) {
                reject(err);
            });
        })
    };

    before(function (done) {
        db.on("open", function () {
            //console.log("dbopen");
            contactCtrlr = require('../controllers/contactCtrlr.js');
            //console.log("ctrlr loader");
            done();
        });
    });

    after(function () {

    });


    describe('01-01.create testing', function () {
        before(function (done) {
            contactCtrlr.clear().then(function () {
                //console.log('clear ok');
                done();
            }).catch(function (err) {
                //console.log('clear failed:' + err);
                done();
            });
        });

        after(function () {

        });

        it('01-01-01.create common contact', function () {
            var reqParams = {
                body: {
                    name: '孔祥海',
                    nameFirstWordChr: 'k',
                    nameAllWordChr: 'kxh',
                    corp: 'shgbit',
                    mobilePhone: '13818212338',
                    mail: 'kongxianghai@shgbit.com'
                }
            };

            return contactCtrlr.save(reqParams).should.be.fulfilled().then(function (it) {
                //console.log('create res:' + it);
                it.result.should.be.equal('done');
            });
        });
    });


    describe('01-02.find testing', function () {
        var contacts = [
            {
                name: '孔祥海',
                nameFirstWordChr: 'k',
                nameAllWordChr: 'kxh',
                corp: 'shgbit',
                mail: 'kongxianghai@shgbit.com'
            },
            {name: '可汗', nameFirstWordChr: 'k', nameAllWordChr: 'kh', corp: '蒙古国皇室', mail: 'kehan@mg.com'},
            {name: '宽己敏', nameFirstWordChr: 'k', nameAllWordChr: 'khm', corp: '大金', mail: 'kjm@dj.com'},
            {name: '阿房女', nameFirstWordChr: 'a', nameAllWordChr: 'epn', corp: '大秦', mail: 'epn@dq.com'}
        ];

        before(function (done) {
            var tasks = [];

            for (var i = 0, contact; contact = contacts[i++];) {
                var reqParams = {body: {}, query: {}};
                reqParams.body = contact;
                tasks.push(saveContacts(reqParams));
            }

            clearContacts()
                .then(function (data) {
                    Promiseb.all(tasks)
                        .then(function (data) {
                            done();
                        })
                })
                .catch(function (err) {
                    console.log('01-02.before.clear faild');
                    done();
                });
        });

        after(function () {

        });

        it('01-02-01.find all contacts', function () {
            return contactCtrlr.findAll().should.be.fulfilled().then(function (it) {
                //console.log('finded all:' + it.data);
                it.result.should.be.equal('done');
                for (var i = 0; i < it.data.length; i++) {
                    var contact = it.data[i];
                    contacts[i].name.should.be.equal(contact.name);
                    contacts[i].nameFirstWordChr.should.be.equal(contact.nameFirstWordChr);
                    contacts[i].nameAllWordChr.should.be.equal(contact.nameAllWordChr);
                    contacts[i].corp.should.be.equal(contact.corp);
                    contacts[i].mail.should.be.equal(contact.mail);
                }
            });
        });
    });

});


