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

exports.movies_avaliable = (req, res) => {

    return models.MovieTitle.AvaliableCopies()
    .then(movies => {  

        res.json(movies)
    })
    //.catch (err => res.json(err));    

}

exports.movies_avaliable_by_title = (req, res) => {

    let title_query = req.params.title

    return models.MovieTitle.AvaliableCopiesByName(title_query)
        .then(movies => {

            res.json(movies)
        })
    //.catch (err => res.json(err));    

}

/** movie_create controller */
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


/** test database controller */
exports.test_database = (req, res) => {

    /*
    models.Movie.findAll().then(movies => {

        movies.forEach(data => {
            console.log(data.movieTitle);
            console.log(data.directorName);
        });
        res.send('Connection SUCCESSFULLY!');
        

    });
    */
    /**
    sequelize.authenticate()
        .then(() => {
            res.send('Connection SUCCESSFULLY!')
        })
        .catch(err => {
            res.send('Unable to connect to the database: ');
            console.error('Unable to connect to the database: ', err);
        });

    //res.send('test database route')
     */
}
