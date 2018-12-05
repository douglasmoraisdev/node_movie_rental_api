/**
 * Movie Routes
 */
let express = require('express');
let movie_controller = require('../controllers/movie_controller');

/** Instance Express Router */
let router = express.Router();

/** GET Movie list Route */
router.get('/', movie_controller.movie_list);

/** GET Avaliable Movies Route */
router.get('/avaliable', movie_controller.movies_avaliable);

/** GET Avaliable Movies Route by Title*/
router.get('/avaliable/bytitle/:title/', movie_controller.movies_avaliable_by_title);

/** POST a new Movie Route */
router.post('/', movie_controller.movie_create);

/** POST Movie Rent */
router.post('/rent/:movie_id', movie_controller.movie_rent);

/** PUT Movie Return */
router.put('/return/:movie_copy_id', movie_controller.movie_returned);



/** Exports Route */
module.exports = router;
