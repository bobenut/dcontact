var express = require('express');
var router = express.Router();
var contactCtrlr = require('../controllers/contactCtrlr.js');

router.get('/data', function(req,res,next){
    var reqParams = {
        query: {
            sort: {'nameFirstWordChr': 'asc', 'nameAllWordChr': 'asc'}
        }
    };

    contactCtrlr.findContacts(reqParams)
        .then(function(data){
            res.send(data.data);
        })
        .catch(function(err){
            res.send(err);
        });
});

module.exports = router;