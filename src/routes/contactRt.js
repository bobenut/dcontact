var express = require('express');
var router = express.Router();
var contactCtrlr = require('../controllers/contactCtrlr.js');
var reqParamsGetter = require('../utilities/reqParamsGetter.js');

router.get('/data', function (req, res, next) {
    var reqParams = {
        query: {
            sort: {'nameFirstWordChr': 'asc', 'nameAllWordChr': 'asc'}
        }
    };

    contactCtrlr.findContacts(reqParams)
        .then(function (data) {
            res.send(data.data);
        })
        .catch(function (err) {
            res.send(err);
        });
});

router.post('/data', function (req, res, next) {
    var reqParams = reqParamsGetter.get(req);

    contactCtrlr.save(reqParams)
        .then(function (data) {
            res.send({result: 'success'});
        })
        .catch(function (err) {
            res.send({result: 'failed', errMsg: err});
        });
});

module.exports = router;