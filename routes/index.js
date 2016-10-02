var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'P5 Playground' });
});

router.get('/experiments/terrain', function (req, res, next) {
  res.render('terrain', { title: 'Terrain' })
});

router.get('/experiments/fractal-tree-1', function (req, res, next) {
  res.render('fractal-tree-1', { title: 'Fractal Tree 1' })
});

module.exports = router;
