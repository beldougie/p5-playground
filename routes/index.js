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

router.get('/experiments/maze-dfrb', function (req, res, next) {
  res.render('maze-dfrb', { title: 'Maze Generator' });
});

router.get('/experiments/mandlebrot', function (req, res, next) {
  res.render('fractals-mandlebrot', { title: 'Mandlebrot Set Fractal' });
});

router.get('/experiments/julia', function (req, res, next) {
  res.render('fractals-julia', { title: 'Julia Set Fractal' });
});

module.exports = router;
