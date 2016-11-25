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
                mobilePhone:'13755555555',
                corp: 'shgbit',
                mail: 'kongxianghai@shgbit.com'
            },
            {name: '可汗', nameFirstWordChr: 'k', nameAllWordChr: 'kh',mobilePhone:'13744444444', corp: '蒙古国皇室', mail: 'kehan@mg.com'},
            {name: '宽己敏', nameFirstWordChr: 'k', nameAllWordChr: 'khm',mobilePhone:'13711111111', corp: '大金', mail: 'kjm@dj.com'},
            {name: '阿房女', nameFirstWordChr: 'a', nameAllWordChr: 'epn',mobilePhone:'13733333333', corp: '大秦', mail: 'epn@dq.com'}
        ];

        var contactsSort1firstChr2WordChr = [
            {name: '阿房女', nameFirstWordChr: 'a', nameAllWordChr: 'epn',mobilePhone:'13733333333', corp: '大秦', mail: 'epn@dq.com'},
            {name: '可汗', nameFirstWordChr: 'k', nameAllWordChr: 'kh',mobilePhone:'13744444444', corp: '蒙古国皇室', mail: 'kehan@mg.com'},
            {name: '宽己敏', nameFirstWordChr: 'k', nameAllWordChr: 'khm',mobilePhone:'13711111111', corp: '大金', mail: 'kjm@dj.com'},
            {
                name: '孔祥海',
                nameFirstWordChr: 'k',
                nameAllWordChr: 'kxh',
                mobilePhone:'13755555555',
                corp: 'shgbit',
                mail: 'kongxianghai@shgbit.com'
            }
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
            return contactCtrlr.findContacts().should.be.fulfilled().then(function (it) {
                //console.log('finded all:' + it.data);
                it.result.should.be.equal('done');
                for (var i = 0; i < it.data.length; i++) {
                    var contact = it.data[i];
                    contacts[i].name.should.be.equal(contact.name);
                    contacts[i].nameFirstWordChr.should.be.equal(contact.nameFirstWordChr);
                    contacts[i].nameAllWordChr.should.be.equal(contact.nameAllWordChr);
                    contacts[i].mobilePhone.should.be.equal(contact.mobilePhone);
                    contacts[i].corp.should.be.equal(contact.corp);
                    contacts[i].mail.should.be.equal(contact.mail);
                }
            });
        });

        it('01-02-02.find all contacts by sort, sorting suqence is first char, full word', function () {
            var reqParams = {
                query: {
                    sort: {'nameFirstWordChr': 'asc', 'nameAllWordChr': 'asc'}
                }
            };
            return contactCtrlr.findContacts(reqParams).should.be.fulfilled().then(function (it) {
                //console.log('finded all:' + it.data);
                it.result.should.be.equal('done');
                for (var i = 0; i < it.data.length; i++) {
                    var contact = it.data[i];
                    contactsSort1firstChr2WordChr[i].name.should.be.equal(contact.name);
                    contactsSort1firstChr2WordChr[i].nameFirstWordChr.should.be.equal(contact.nameFirstWordChr);
                    contactsSort1firstChr2WordChr[i].nameAllWordChr.should.be.equal(contact.nameAllWordChr);
                    contactsSort1firstChr2WordChr[i].mobilePhone.should.be.equal(contact.mobilePhone);
                    contactsSort1firstChr2WordChr[i].corp.should.be.equal(contact.corp);
                    contactsSort1firstChr2WordChr[i].mail.should.be.equal(contact.mail);
                }
            });
        });
    });

});


