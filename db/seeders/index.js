const db = require('../models')

const MovieTitleSeed = require('./0-demo-movie');
const MovieCopySeed = require('./1-demo-copy');
const UserSeed = require('./2-demo-user');
const RentalSeed = require('./3-demo-rental');

exports.up = () => {
       
    const queryInterface = db.sequelize.getQueryInterface();

    return [
        MovieTitleSeed.up(queryInterface),
        MovieCopySeed.up(queryInterface),
        UserSeed.up(queryInterface),
        RentalSeed.up(queryInterface)
    ];
    

}

exports.down = () => {

    const queryInterface = db.sequelize.getQueryInterface();

    return [
        MovieTitleSeed.down(queryInterface),
        MovieCopySeed.down(queryInterface),
        UserSeed.down(queryInterface),
        RentalSeed.down(queryInterface)
    ];


}
