const express = require('express')
const movie_router = require('./routes/movie_routes')
const user_router = require('./routes/user_routes')
const bodyParser = require('body-parser')
const jwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');


/** Instance Express App */
const app = express()

app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: false }))
app.use(jwt());


/** Add Movies Route to app */
app.use('/movies', movie_router);

/** Add User Route to app */
app.use('/users', user_router);

app.use(errorHandler);

/** Make server up */
const server = app.listen(3000, () => {
    //let host = server.address().address
    let port = server.address().port
    
    console.log('Movie Rental Server running at http://localhost:%s',port)
})


module.exports = app;