# node_movie_rental_api
A simple Movie Rental API with Node and Express.js

## Description
A REST API for a Movie Rental Business:

* Show all available Movies to Rent.
* Each Movie (Movie Title), may have many copies (Movie Copy)
* A User can register
* A User can do Login/Logout using a Auth Token
* A User can Rent one or many Movie Copies available
* A User just can Rent Available Movies (a Movie Copy not Rented)
* A User can Return a Movie Copy rented using a movie_copy_id
* For list, rent and return movies, a User should be authenticated

## Running

* 1 - Update packages
  
  ```
  $ npm install
  ```

* 2 - Start Server
  ```
    $ npm start
  ```


* 3 - Server available on:
>http://localhost:3000

## Database Migration

* 1 - Go to the database path
  ```
  $ cd movie_rental/db/
  ```


* 2 - Delete migration lock (if exists)
  ```
  $ rm sequelize-meta.json
  ```


* 3 - Create a alias for Sequelize CLI (Optional)
  ```
  $ alias sequelize='../node_modules/.bin/sequelize'
  ```


* 4 - Run migration
  ```
  $ sequelize db:migrate
  ```


* 5 - Populate database
  ```
  $ sequelize db:seed:all
  ```



## Test

* Run tests
  ```
  $ npm test
  ```

## API EndPoints Description

Note: All endpoints (except /users/register and /users/authenticate) must be authenticated using User Token on the Authorization Header!


CURL example:
  ```
 $ curl -X GET http://localhost:3000/movies/available -H 'authorization: Bearer 4user.generated.tok3n'
  ``` 

### User Routes

> /users/authenticate
>
Authenticate a user, return the Auth Token
* params(JSON) :
  * username (The user email)
  * password (User password)

* returns:  
    * token (Use it on Authorization Header Bearer)


> /users/register
>
Register a new user
* params(JSON):
  * username (The user email)
  * password (User password)
  * firstName (User First Name)
  * lastName (User Last Name)

* returns:  
    * token (Use it on Authorization Header Bearer)


### Movies Routes

> /movies/available
>
Show a list of all available Movies for Rent and its quantity.
* returns:  
    * id (Movie id. Use it for Rent a movie)
    * title (Movie title name)
    * availables (available quantity)