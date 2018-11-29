'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Joao',
        lastName: 'Silva',
        email: 'j.silva@gmail.com',
        password: 'abacate'   
      },
      {
        firstName: 'Maria',
        lastName: 'Rodrigues',
        email: 'm.rodrigues@gmail.com',
        password: '1234'
      },
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Users', null, {});    

  }
};
