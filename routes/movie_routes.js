/**
 * Movie Routes
 */
let express = require('express');
let movie_controller = require('./controllers/movie_controller');

/** Instance Express Router */
let router = express.Router();

/** Root Movie Route */
router.get('/', movie_controller.movie_list);

/** /about Movie Route */
router.get('/about', (req, res) => {
    res.send('Movies About')
});


/** Test Database Route */
router.get('/test_database', movie_controller.test_database);

/** Exports Route */
module.exports = router;
