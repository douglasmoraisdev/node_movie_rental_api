'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('MovieTitles', [
      {
      title: 'Avangers 2',
      directorName: 'Stan Lee',
      },
      {
      title: 'Avangers 3',
      directorName: 'Stan Lee',
      },
      {
      title: 'Bad Boys',
      directorName: 'Will Smith',
      },
      {
      title: 'Expendables',
      directorName: 'Sylverster Stallone',
      },
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('MovieTitles', null, {});    

  }
};
