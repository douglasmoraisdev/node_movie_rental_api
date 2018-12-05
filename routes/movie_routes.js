/**
 * Movie Routes
 */
let express = require('express');
let movie_controller = require('../controllers/movie_controller');

/** Instance Express Router */
let router = express.Router();

/** GET Movie list Route */
router.get('/', movie_controller.movie_list);

/** GET Available Movies Route */
router.get('/available', movie_controller.movies_available);

/** GET Available Movies Route by Title*/
router.get('/available/bytitle/:title/', movie_controller.movies_available_by_title);

/** POST a new Movie Route */
router.post('/', movie_controller.movie_create);

/** POST Movie Rent */
router.post('/rent/:movie_id', movie_controller.movie_rent);

/** PUT Movie Return */
router.put('/return/:movie_copy_id', movie_controller.movie_returned);



/** Exports Route */
module.exports = router;
