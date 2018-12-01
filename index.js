const express = require('express')
const movie_router = require('./routes/movie_routes')
const bodyParser = require('body-parser')

/** Instance Express App */
const app = express()

app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: false }))


/** Add Movies Route to app */
app.use('/movies', movie_router);

/** Make server up */
const server = app.listen(3000, () => {
    //let host = server.address().address
    let port = server.address().port
    
    console.log('Movie Rental Server running at http://localhost:%s',port)
})


module.exports = app;