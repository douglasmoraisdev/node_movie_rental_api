/**
 * Movie Controllers
 */
const models = require('../db/models');
const { checkSchema, validationResult } = require('express-validator/check');
const Sequelize = require('sequelize');


/** movie_list controller */
exports.movie_list = (req, res) => {

    return models.MovieTitle.findAll().then(movies => {
        res.json(movies);
    });
   
}

/** list all Avaliable Movies  */
exports.movies_avaliable = (req, res) => {

    return models.MovieTitle.AvaliableCopies()
    .then(movies => {  

        res.json(movies)
    })
    //.catch (err => res.json(err));    

}

//** list Avaliable Movies by a given title */
exports.movies_avaliable_by_title = (req, res) => {

    let title_query = req.params.title

    return models.MovieTitle.AvaliableCopiesByName(title_query)
        .then(movies => {

            res.json(movies)
        })
    //.catch (err => res.json(err));    

}

/** create a new Movie Title */
exports.movie_create = [
    checkSchema({
        title:{
            //title Validations            
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
    (req, res) => {

        /** Check validations */
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        /** Create the Movie */
        return models.MovieTitle.create(
            {
                title: req.body.title, 
                directorName: req.body.directorName
            }
        ).then(movie => 
            res.json({ msg: "Movie successfully added!", movie })
        )

}]

/** create a new Rent */
exports.movie_rent = [
    checkSchema({
        movie_id: {
            //title Validations            
            in: ['body'],
            isEmpty: {
                errorMessage: 'movie_id is required',
                negated: true
            },
        },

        user_id: {
            in: ['body'],
            isEmpty: {
                errorMessage: 'user_id is required',
                negated: true
            },
        }

    }),
    /** Request handle */
    async (req, res) => {

        /** Check validations */
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        /** Query user by given user_id */
        let user = await models.User.findOne({
            where: { id: req.body.user_id }
        })
        try {           
            var user_id = user.id 
        } catch(e) {
            return res.status(422).json({ msg: "User not found" })            
        }

        /** Query Avaliable MovieCopies by given movie_id */
        let movie_copy = await models.MovieTitle.AvaliableCopiesByTitleId(req.body.movie_id)
        try {        
            var movie_copy_id = movie_copy[0].id
        } catch(e) {
            return res.status(422).json({ msg: "Movie not rented! No avaliable copies from given movie_id" })            
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

        return res.json({ msg: "Movie successfully rented!", rent })

    }]

/** create a new Rent */
exports.movie_returned = [
    checkSchema({
        movie_copy_id: {
            //title Validations            
            in: ['body'],
            isEmpty: {
                errorMessage: 'movie_copy_id is required',
                negated: true
            },
        },

        user_id: {
            in: ['body'],
            isEmpty: {
                errorMessage: 'user_id is required',
                negated: true
            },
        }

    }),
    /** Request handle */
    async (req, res) => {

        /** Check validations */
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        /** Query user by given user_id */
        let user = await models.User.findOne({
            where: { id: req.body.user_id }
        })
        try {
            var user_id = user.id
        } catch (e) {
            return res.status(422).json({ msg: "User not found" })
        }

        /** Query the MovieCopy rented by user */
        let movie_copy_rented = await models.Rental.findOne({
            where: { [Sequelize.Op.and]: [{ User_ID: user_id }, 
                                          { movieCopy_ID: req.body.movie_copy_id},
                                        ]}

        })

        /** Check is the Rent exists */
        if (movie_copy_rented == null) {
            return res.status(422).json({ msg: "No rents found for this movie and/or user!" })
        }


        /** Check is the Movie Copy was already returned */
        if (movie_copy_rented.returnDate != null){
            return res.status(422).json({ msg: "Movie already returned!" })            
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

        return res.json({ msg: "Movie successfully returned!", movie_return })

    }]
