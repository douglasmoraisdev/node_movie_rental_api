'use strict';
module.exports = (sequelize, DataTypes) => {
  const MovieTitle = sequelize.define('MovieTitle', {
    title: DataTypes.STRING,
    directorName: DataTypes.STRING
  }, {});
  MovieTitle.associate = function(models) {
    // associations can be defined here
  };
  return MovieTitle;
};