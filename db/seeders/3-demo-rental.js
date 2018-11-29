'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Rentals', [
      {
        rentalDate: Date.now()-15,
        returnDate: Date.now(),
        movieCopy_ID: 1,
        User_ID:1
      },
      {
        rentalDate: Date.now() - 3,
        returnDate: null,
        movieCopy_ID: 4,
        User_ID: 2
      },

    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Rentals', null, {});    

  }
};
