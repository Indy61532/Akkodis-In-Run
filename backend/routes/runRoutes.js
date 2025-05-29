const express = require('express');
const router = express.Router();
const runController = require('../controllers/runController');
const verifyToken = require('../middleware/verifyToken');

// Přidání běhu
router.post('/', verifyToken, runController.addRun);

// Statistiky a běhy uživatele
router.get('/my-top', verifyToken, runController.getUserRuns);
router.get('/stats', verifyToken, runController.getStats);

// Top běžci (🆕)
router.get('/top', verifyToken, runController.getTopRunners);

module.exports = router;
