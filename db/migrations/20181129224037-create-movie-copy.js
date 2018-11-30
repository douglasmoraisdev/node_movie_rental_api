'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MovieCopies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      barcode: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },      
      movieTitle_ID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'MovieTitles',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'NO ACTION'
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
    return queryInterface.dropTable('MovieCopies');
  }
};