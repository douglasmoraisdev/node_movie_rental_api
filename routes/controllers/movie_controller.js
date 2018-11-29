/**
 * Movie Controllers
 */
const Movies = require('../../core/movies')


/** movie_list controller */
exports.movie_list = async (req, res) => {

    let movies = new Movies()
    
    let movies_list = await movies.get_list();
   
    res.json(movies_list);
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