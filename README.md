# node_movie_rental_api
A simple Movie Rental API with Node and Express.js


## Table of Contents

1. [Description](#Description)
2. [Running](#Running)
3. [Database Migration](#database-migration)
4. [Test](#Test)
4. [API EndPoints Description](#API-EndPoints-Description)

---

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
* body params(JSON format) :
  * username (The user email)
  * password (User password)

* returns:  
    * token (Use it on Authorization Header Bearer)


> /users/register
>
Register a new user
* body params(JSON format):
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
    * id (Available Movie Title id. Use it for Rent a movie)
    * title (Movie title name)
    * availables (available quantity)

> /movies/rent/<movie_id>
>
Rent a Movie for a User. Get the first available Copy of a Movie, register the rent and returns the Movie Copy Info rented.
* url params:
    * movie_id (ID of a available Movie Title)
* returns:  
    * rent
        * id (id of the Rent)
        * movieCopy_ID (id of a Movie Copy. Use it for return the Movie)
        * User_ID (id of the User),
        * rentalDate (Rent timestamp),

> /movies/return/<movie_copy_id>
>
Returns a Movie for a User.
* url params:
    * movie_copy_id (ID of a Movie Copy for return)
* returns:  
    * msg: (Status messagem)
    * success: (Success Status)
