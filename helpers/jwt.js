const expressJwt = require('express-jwt');
//const config = require('config.json');
const userService = require('../services/user.service');
const jsonwt = require('jsonwebtoken')

function jwtdecode (authorization){
    
    let token = authorization.split(' ')[1]
    return jsonwt.verify(token, 'config.secret', function (err, decoded) {
        return decoded.sub
    });
    
    
}

function jwt () {
    const secret = 'config.secret';
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);
    
    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }
    
    done();
};

module.exports = { jwt, jwtdecode };