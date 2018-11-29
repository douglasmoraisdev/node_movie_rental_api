'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('MovieCopies', [
      {
        movieTitle_ID: '1',
        barcode: '0001'
      },
      {
        movieTitle_ID: '1',    
        barcode: '0002'
      },
      {
        movieTitle_ID: '1',
        barcode: '0003'
      },
      {
        movieTitle_ID: '2',
        barcode: '0004'
      },
      {
        movieTitle_ID: '2',
        barcode: '0005'
      },
      {
        movieTitle_ID: '3',
        barcode: '0006'
      },
      {
        movieTitle_ID: '4',
        barcode: '0007'
      },
      {
        movieTitle_ID: '4',
        barcode: '0008'
      },
      {
        movieTitle_ID: '4',
        barcode: '0009'
      },
      {
        movieTitle_ID: '4',
        barcode: '0010'
      },
      {
        movieTitle_ID: '4',
        barcode: '0011'
      },
      {
        movieTitle_ID: '4',
        barcode: '0012'
      },


    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('MovieCopies', null, {});    

  }
};
