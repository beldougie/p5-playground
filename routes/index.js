var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'P5 Playground' });
});

router.get('/experiments/terrain', function (req, res, next) {
  res.render('terrain', { title: 'Terrain' })
});

module.exports = router;