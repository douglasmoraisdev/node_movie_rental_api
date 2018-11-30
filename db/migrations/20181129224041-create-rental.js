'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Rentals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      movieCopy_ID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'MovieCopies',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'NO ACTION'        
      },
      User_ID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'NO ACTION'        
      },
      rentalDate: {
        type: Sequelize.DATE
      },
      returnDate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Rentals');
  }
};