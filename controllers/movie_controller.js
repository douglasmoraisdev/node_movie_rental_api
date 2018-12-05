/**
 * Movie Controllers
 */
const models = require('../db/models');
const { checkSchema, validationResult } = require('express-validator/check');
const Sequelize = require('sequelize');
const { jwtDecode } = require('../helpers/jwt')

/** Return all Movies  */
exports.movie_list = async (req, res) => {

    let movies = await (models.MovieTitle.findAll())
    res.json(movies)
   
}

/** list all Available Movies  */
exports.movies_available = async (req, res) => {

    let movies = await models.MovieTitle.AvailableCopies();
    res.json(movies);

}

//** list Available Movies by a given title */
exports.movies_available_by_title = async (req, res) => {

    let title_query = req.params.title;

    let movies = await models.MovieTitle.AvailableCopiesByName(title_query);
    res.json(movies);
        
}

/** create a new Movie Title */
exports.movie_create = [
    checkSchema({
        //title Validations            
        title:{
            in: ['body'],
            isLength: {
                errorMessage: 'Title should be between 3 to 50 chars long',
                options: { min: 3, max: 50 }
            },
            //title sanitization
            trim: {
                options: [" "]
            }
        },
        //director Name Validations
        directorName: {
            in: ['body'],
            isLength: {
                errorMessage: 'Director Name should be between 3 to 50 chars long',
                options: { min: 3, max: 50 }
            },
            trim: {
                options: [" "]
            }
        }

    }),
    /** Request handle */
    async (req, res) => {

        /** Check validations */
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        /** Create the Movie */
        let movie = await models.MovieTitle.create(
            {
                title: req.body.title, 
                directorName: req.body.directorName
            }
        );
        res.json({ msg: "Movie successfully added!", movie });

}]

/** create a new Rent */
exports.movie_rent = async (req, res) => {

        /** Check validations */
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        
        /** Query user by user_id from the auth token */
        let auth_user_id = jwtDecode(req.headers.authorization);
        let user = await models.User.findOne({
            where: { id: auth_user_id }
        })
        try {           
            var user_id = user.id 
        } catch(e) {
            return res.status(422).json({ msg: "User not found" })            
        }

        /** Query Available MovieCopies by given movie_id */
        let movie_copy = await models.MovieTitle.AvailableCopiesByTitleId(req.params.movie_id)
        try {        
            var movie_copy_id = movie_copy[0].id
        } catch(e) {
            return res.status(422).json({ msg: "Movie not rented! No available copies from given movie_id" })            
        }

        /** Create the Rent */
        try {
            var rent = await models.Rental.create(
                {
                    movieCopy_ID: movie_copy_id,
                    User_ID: user_id,
                    rentalDate: Date.now()
                }
            )
        } catch (e) {
            return res.status(422).json({ msg: "Movie not rented!", e})
        }

        return res.json({ msg: "Movie successfully rented!", success: true, rent })

    }

/** create a new Rent */
exports.movie_returned = async (req, res) => {

        /** Query user by user_id from the token */
        let auth_user_id = jwtDecode(req.headers.authorization);
        let user = await models.User.findOne({
            where: { id: auth_user_id }
        })
        try {
            var user_id = user.id
        } catch (e) {
            return res.status(422).json({ msg: "User not found" })
        }

        /** Query the MovieCopy rented by user */
        let movie_copy_rented = await models.Rental.findOne({
            where: { [Sequelize.Op.and]: [{ User_ID: user_id }, 
                                          { movieCopy_ID: req.params.movie_copy_id},
                                          { returnDate: null},
                                        ]}
        })

        /** Check is the Rent exists */
        if (movie_copy_rented == null) {
            return res.status(422).json({ msg: "No open rents found for this movie and/or user!" })
        }


        /** Update the Rent */
        try {
            var movie_return = await models.Rental.update(
                {
                    returnDate: Date.now()
                },
                {
                    where: {
                        id: movie_copy_rented.id
                    }
                }
            )
        } catch (e) {
            return res.status(422).json({ msg: "Movie not returned!", e })
        }

    return res.json({ msg: "Movie successfully returned!", success: true, movie_return })

    }
