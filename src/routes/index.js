var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('indexAg', { title: 'contact' });
});

router.get('/vue', function(req, res, next) {
  res.render('indexVue', { title: 'contact' });
});

module.exports = router;
