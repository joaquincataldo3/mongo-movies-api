const express = require('express');
const controller = require('../controllers/genreController');
const router = express.Router();


router.post('/newGenre', controller.createGenre); 

router.put('/push', controller.pushGenreInMovie);






module.exports = router;