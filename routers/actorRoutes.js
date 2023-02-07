const express = require('express');
const controller = require('../controllers/actorsController');
const uploadImages = require('../middlewares/actorsMulterMiddleware');
const router = express.Router();

router.post('/new', uploadImages.single("image"), controller.createActor);

router.get('/:id', controller.fetchActors);

module.exports = router;