/**
 * Movie Controllers
 */
const models = require('../db/models');



/** movie_list controller */
exports.movie_list = (req, res) => {

    return models.MovieTitle.findAll().then(movies => {
        res.json(movies);
    });
   
}

/** movie_create controller */
exports.movie_create = (req, res) => {

    
    return models.MovieTitle.create(
        {title: req.body.title, directorName: req.body.directorName}
    ).then(movieTitle => {
        res.json({ message: "Movie successfully added!", movieTitle });
    })


}


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