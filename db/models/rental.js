'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rental = sequelize.define('Rental', {
    rentalDate: DataTypes.DATE,
    returnDate: DataTypes.DATE
  }, {});
  Rental.associate = function(models) {
    // associations can be defined here
    Rental.belongsTo(models.User);
    Rental.belongsTo(models.MovieCopy);

  };
  return Rental;
};