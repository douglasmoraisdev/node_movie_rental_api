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
  MovieTitle.AvaliableCopies = async () => await sequelize.query(
                                                                "select MovieTitles.id, title, count(title) as avaliables \
                                                                from MovieTitles  \
                                                                right join MovieCopies  \
                                                                on MovieTitles.id = MovieCopies.movieTitle_ID  \
                                                                where MovieCopies.id not in ( \
                                                                select movieCopy_ID \
                                                                from Rentals  \
                                                                where(Rentals.returnDate is null)) \
                                                                group by title, MovieTitles.id",

  {
    type: sequelize.QueryTypes.SELECT
  })

  /** Complex query to get all Movie Titles copies avaliable with rental status */
  MovieTitle.AvaliableCopiesByName = async (title) => await sequelize.query(
                                                                            "select MovieTitles.id, title, count(title) as avaliables \
                                                                            from MovieTitles  \
                                                                            right join MovieCopies  \
                                                                            on MovieTitles.id = MovieCopies.movieTitle_ID  \
                                                                            where  \
                                                                            MovieTitles.title like '"+ title + "%' \
                                                                            and MovieCopies.id not in ( \
                                                                            select movieCopy_ID \
                                                                            from Rentals  \
                                                                            where(Rentals.returnDate is null)) \
                                                                            group by title, MovieTitles.id",
  {  
    type: sequelize.QueryTypes.SELECT
  })

  /** Complex query to get a Avaliable MovieCopy by MovieTitle id */
  MovieTitle.AvaliableCopiesByTitleId = async (movie_id) => await sequelize.query(
                                                                                  "select MovieCopies.* \
                                                                                  from MovieTitles \
                                                                                  right join MovieCopies \
                                                                                  on MovieTitles.id = MovieCopies.movieTitle_ID \
                                                                                  where MovieTitles.id = "+movie_id+" \
                                                                                  and MovieCopies.id not in ( \
                                                                                  select movieCopy_ID \
                                                                                  from Rentals \
                                                                                  where(Rentals.returnDate is null))"
,
  {
    type: sequelize.QueryTypes.SELECT
  })

  return MovieTitle;
};  