const express = require('express');
const controller = require('../controllers/moviesController');
const uploadImages = require('../middlewares/movieMulterMiddleware');
const router = express.Router();

router.get('/all', controller.allMovies);
router.get('/:id', controller.findOne);

router.post('/newMovie', uploadImages.single('image'), controller.createMovie);

router.put('/update/:id', controller.updateMovie);

router.delete('/delete/:id', controller.deleteMovie);




module.exports = router;