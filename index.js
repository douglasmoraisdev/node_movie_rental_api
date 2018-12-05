const express = require('express')
const movie_router = require('./routes/movie_routes')
const user_router = require('./routes/user_routes')
const bodyParser = require('body-parser')
const { jwtMiddleware } = require('./helpers/jwt');
const { errorHandler } = require('./helpers/error-handler');


/** Instance Express App */
const app = express()

/** Add body parser Middleware to app*/
app.use(bodyParser.json())

/** Add JsonWebToken Auth Middleware to app */
app.use(jwtMiddleware());

/** Add Movies Route to app */
app.use('/movies', movie_router);

/** Add User Route to app */
app.use('/users', user_router);

/** Add custom error handler Middleware to app*/
app.use(errorHandler);

/** Make server up */
const server = app.listen(3000, () => {
    let port = server.address().port
    
    console.log('Movie Rental Server running at http://localhost:%s',port)
})


module.exports = app;