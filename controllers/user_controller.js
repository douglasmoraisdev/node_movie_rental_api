/**
 * Movie Controllers
 */
const userService = require('../services/user.service');

/** Check user/password and return a valit JWT Token on success */
exports.authenticate = async (req, res, next) => {
    let user = await userService.authenticate(req.body)
    
    try{
        user ? res.json({ token: user.token }) : res.status(400).json({ message: 'Username or password is incorrect' });
    }catch(e){
        next(err);
    }
}

/** Create a new User and return the new information on success*/
exports.register = async (req, res, next) => {
    let user = await userService.create(req.body)

    try{
        user.password = req.body.password;
        res.json( { user } );
    }catch(e){
        next(err);
    }
}