'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rental = sequelize.define('Rental', {
    movieCopy_ID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'MovieCopies',
        key: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'NO ACTION'         
    },
    User_ID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'NO ACTION'         
    },    
    rentalDate: DataTypes.DATE,
    returnDate: DataTypes.DATE
  }, {});
  Rental.associate = function(models) {
    // associations can be defined here
    Rental.belongsTo(models.User, { foreignKey: 'User_ID'});
    Rental.belongsTo(models.MovieCopy, { foreignKey: 'movieCopy_ID'});

  };
  return Rental;
};