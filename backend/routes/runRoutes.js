const express = require('express');
const router = express.Router();
const runController = require('../controllers/runController');

// API routy
router.post('/', runController.addRun);         // přidání nového běhu
router.get('/', runController.getAllRuns);      // všichni uživatelé a jejich běhy
router.get('/:id', runController.getUserRuns);  // běhy konkrétního uživatele

module.exports = router;
