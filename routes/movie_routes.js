/**
 * Movie Routes
 */
let express = require('express');
let movie_controller = require('../controllers/movie_controller');

/** Instance Express Router */
let router = express.Router();

/** Root / GET Movie Route */
router.get('/', movie_controller.movie_list);

/** GET Avaliable Movies Route */
router.get('/avaliable', movie_controller.movies_avaliable);

/** GET Avaliable Movies Route by Title*/
router.get('/avaliable/bytitle/:title/', movie_controller.movies_avaliable_by_title);

/** Root / POST Movie Route */
router.post('/', movie_controller.movie_create);

/** Root / POST Movie Route */
router.post('/rent', movie_controller.movie_rent);



/** Exports Route */
module.exports = router;
