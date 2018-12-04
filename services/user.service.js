//const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const models = require('../db/models');
const User = models.User;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

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

async function getAll() {
    return await User.findAll()
}

async function getById(id) {
    return await User.findOne({where: {id:id } })
}

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
            password: bcrypt.hashSync(userParam.password, 10)
        }
    )    

}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.password = bcrypt.hashSync(userParam.password);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}
