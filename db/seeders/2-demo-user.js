'use strict';
const bcrypt = require('bcryptjs');


module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Joao',
        lastName: 'Silva',
        email: 'j.silva@gmail.com',
        password: bcrypt.hashSync('abacate', 10),
        //password: 'abacate'
      },
      {
        firstName: 'Maria',
        lastName: 'Rodrigues',
        email: 'm.rodrigues@gmail.com',
        password: bcrypt.hashSync('1234', 10),
        //password: '1234'
      },
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Users', null, {});    

  }
};
