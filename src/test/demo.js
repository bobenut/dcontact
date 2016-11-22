"use strict"
var mongoose = require('mongoose');

global.db = mongoose.createConnection('mongodb://localhost/contactmgr');
db.on("error", function (err) {
    console.log(err);
});

db.on("open", function () {
    console.log("dbopen");
});

var contactCtrlr = require('../controllers/contactCtrlr.js');

var saveContacts = function (reqParams) {
    return new Promise(function (resolve, reject) {
        contactCtrlr.save(reqParams).then(function (data) {
            resolve(data);
        }).catch(function (err) {
            reject(err);
        });
    })
};

var clearContacts = function () {
    return new Promise(function (resolve, reject) {
        contactCtrlr.clear().then(function (data) {
            resolve(data);
        }).catch(function (err) {
            reject(err);
        });
    })
};


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

var tasks = [];

for (var i = 0, contact; contact = contacts[i++];) {
    var reqParams = {body: {}, query: {}};
    reqParams.body = contact;
    tasks.push(saveContacts(reqParams));
}

clearContacts()
    .then(function(data){
        Promise.all(tasks)
            .then(function(data){
                contactCtrlr.findAll()
                    .then(function (data) {
                        console.log('finded:' + JSON.stringify(data,null,2));
                    })
                    .catch(function (err) {
                        console.log('find err:' + err);
                    });
            })
            .catch(function(err){
                console.log('01-02.before.clear.saveContact faild');
            });
    })
    .catch(function(err){
        console.log('01-02.before.clear faild');
    });