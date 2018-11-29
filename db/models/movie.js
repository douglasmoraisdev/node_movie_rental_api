'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    movieTitle: DataTypes.STRING,
    directorName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Movie.associate = function(models) {
    // associations can be defined here
  };

  
  return Movie;
};
