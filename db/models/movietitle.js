'use strict';
module.exports = (sequelize, DataTypes) => {
  const MovieTitle = sequelize.define('MovieTitle', {
    title: DataTypes.STRING,
    directorName: DataTypes.STRING
  }, {});
  MovieTitle.associate = function (models) {
    // associations can be defined here

  };

  /** Complex query to get all Movie Titles copies avaliable with rental status */
  MovieTitle.AvaliableCopies = () => sequelize.query("select MovieTitles.id, title, count(title) as avaliables \
                                                      from MovieTitles \
                                                      right join MovieCopies \
                                                      on MovieTitles.id = MovieCopies.movieTitle_ID \
                                                      left join Rentals \
                                                      on MovieCopies.id = Rentals.movieCopy_ID \
                                                      where Rentals.rentalDate is null or (Rentals.returnDate is not null) \
                                                      group by title, MovieTitles.id",
  {
    type: sequelize.QueryTypes.SELECT
  })
  .then(movies => {
    // We don't need spread here, since only the results will be returned for select queries
    return movies
  })

  /** Complex query to get all Movie Titles copies avaliable with rental status */
  MovieTitle.AvaliableCopiesByName = (title) => sequelize.query("select MovieTitles.id, title, count(title) as avaliables \
                                                            from MovieTitles \
                                                            right join MovieCopies \
                                                            on MovieTitles.id = MovieCopies.movieTitle_ID \
                                                            left join Rentals \
                                                            on MovieCopies.id = Rentals.movieCopy_ID \
                                                            where (Rentals.rentalDate is null or Rentals.returnDate is not null) \
                                                            and title like '"+title+"%' \
                                                            group by title, MovieTitles.id",
  {
    type: sequelize.QueryTypes.SELECT
  })
  .then(movies => {
    // We don't need spread here, since only the results will be returned for select queries
    return movies
  })

  return MovieTitle;
};  