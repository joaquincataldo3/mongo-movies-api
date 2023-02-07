const express = require('express');
const controller = require('../controllers/moviesController');
const uploadImages = require('../middlewares/movieMulterMiddleware');
const router = express.Router();

router.get('/all', controller.allMovies);
/* router.get('/movie-created', controller.createMovie); */

router.get('/all', controller.allMovies);

router.get('/:id', controller.findOne);

// create new movie
router.post('/new', uploadImages.single("image"), controller.createMovie);

module.exports = router;