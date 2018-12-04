/**
 * Movie Routes
 */
const express = require('express');
//const movie_controller = require('../controllers/movie_controller');
const userService = require('../services/user.service');

/** Instance Express Router */
const router = express.Router();

router.post('/authenticate', authenticate);
router.post('/register', register);

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => { 
            user ? res.json({token : user.token}) : res.status(400).json({ message: 'Username or password is incorrect' }) ;
        })
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.create(req.body)
        .then((user) => {
            user.password = req.body.password
            res.json({user})
        })
        .catch(err => next(err));
}


/** Exports Route */
module.exports = router;
