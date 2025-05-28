const express = require('express');
const router = express.Router();
const runController = require('../controllers/runController');
const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken, runController.addRun);

module.exports = router;
