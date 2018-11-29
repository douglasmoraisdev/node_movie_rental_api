'use strict';
module.exports = (sequelize, DataTypes) => {
  const MovieCopy = sequelize.define('MovieCopy', {
    barcode: Sequelize.STRING,
    movieTitle_ID: {
      type: Sequelize.INTEGER,
      references: {
        model: 'MovieTitles',
        key: 'id'
      },
    },    
  }, {});
  MovieCopy.associate = function(models) {
    // associations can be defined here
    MovieCopy.belongsTo(models.MovieTitle)
  };
  return MovieCopy;
};
