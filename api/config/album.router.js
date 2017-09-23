var express = require('express');
var router = express.Router();
var albumController = require('../controllers/album.controller');

router.get('/photos', albumController.getAllPhotos);
router.post('/photos', albumController.uploadPhotos);

module.exports = router;
