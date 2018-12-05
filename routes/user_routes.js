/**
 * Movie Routes
 */
const express = require('express');
const user_controller = require('../controllers/user_controller');

/** Instance Express Router */
const router = express.Router();

router.post('/authenticate', user_controller.authenticate);
router.post('/register', user_controller.register);


/** Exports Route */
module.exports = router;
