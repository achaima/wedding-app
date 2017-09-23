var express = require('express');
var router = express.Router();
var s3Controller = require('../controllers/s3.controller');

router.get('/sign-s3', s3Controller.getSignedRequests);

module.exports = router;
