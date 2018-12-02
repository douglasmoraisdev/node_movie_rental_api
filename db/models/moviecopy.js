'use strict';
module.exports = (sequelize, DataTypes) => {
  const MovieCopy = sequelize.define('MovieCopy', {
    movieTitle_ID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'MovieTitles',
        key: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'NO ACTION'      
    },    
    barcode: DataTypes.STRING,
  }, {});
  MovieCopy.associate = function(models) {
    // associations can be defined here
    MovieCopy.belongsTo(models.MovieTitle, { foreignKey: 'movieTitle_ID'})

  };
  return MovieCopy;
};
