/**
 * Movies Core Bussiness Logic
 */
const models = require('../db/models');


class Movie{

    get_list(){

        return models.Movie.findAll().then(movies => {
            
            return movies;
            /**
             * 
             movies.forEach(data => {
                 console.log(data.movieTitle);
                 console.log(data.directorName);
                });
                res.send('Connection SUCCESSFULLY!');
            */            
            
        });

    }


}

module.exports = Movie
