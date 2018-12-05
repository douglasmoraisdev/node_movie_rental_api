//const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const models = require('../db/models');
const User = models.User;

/** Compare user/password on database and return a new JWT Token*/
async function authenticate({ username, password }) {
    const user = await User.findOne({ where: { email: username } });
    if (user && bcrypt.compareSync(password, user.password)) {
        const { password, ...userWithoutPassword } = user;
        //const token = jwt.sign({ sub: user.id }, config.secret);
        const token = jwt.sign({ sub: user.id }, 'config.secret');
        return {
            ...userWithoutPassword,
            token
        };
    }
}

/** Get a user by id */
async function getById(id) {
    return await User.findOne({where: {id:id } })
}

/** Create a new user on Database */
async function create(userParam) {
    // validate
    let user_exists = await User.findOne({ where: { email: userParam.username }});
    if (user_exists) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    /** Create the User */
    return await models.User.create(
        {
            email: userParam.username,
            password: bcrypt.hashSync(userParam.password, 10),
            firstName: userParam.firstName,
            lastName: userParam.lastName,
        }
    )    

}

module.exports = {
    authenticate,
    getById,
    create,
};
