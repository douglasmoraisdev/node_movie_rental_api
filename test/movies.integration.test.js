/**
 * Tests Movies behavior
 * 
 */

process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index.js');
const models = require('../db/models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Movies tests', () => {
    
    beforeEach((done) => { //Before each test we empty the database

        models.MovieTitle.destroy({ where: { id: { [Op.not]: null } } })
        .then(() => done())
        .catch((err) => done(err))

    });
    
    /*
      * Test the GET / route
      */
    describe('GET / movies', () => {
        it('it should GET all the movies', (done) => {
            chai.request(server)
                .get('/movies')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    /*
      * Test the POST / route
      */
    describe('POST / movie', () => {
        
        it('POST a new Movie Title', (done) => {
            let movieTitle = {
                title: "The Lord of the Rings",
                directorName: "J.R.R. Tolkien",
            }
            chai.request(server)
                .post('/movies')
                .send(movieTitle)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('msg').eql('Movie successfully added!');
                    res.body.movie.should.have.property('title');
                    res.body.movie.should.have.property('directorName');
                    done();
                });
        });

        it('POST a new Movie Title - Trim Title', (done) => {
            let movieTitle = {
                title: " Star Wars ",
                directorName: "George Lucas",
            }
            chai.request(server)
                .post('/movies')
                .send(movieTitle)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('msg').eql('Movie successfully added!');
                    res.body.movie.should.have.property('title');
                    res.body.movie.title.should.eql('Star Wars');
                    res.body.movie.should.have.property('directorName');
                    done();
                });
        });

        it('POST a new Movie Title - Trim Director Name', (done) => {
            let movieTitle = {
                title: "Star Wars 3",
                directorName: " George Lucas ",
            }
            chai.request(server)
                .post('/movies')
                .send(movieTitle)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('msg').eql('Movie successfully added!');
                    res.body.movie.should.have.property('title');
                    res.body.movie.directorName.should.eql('George Lucas');
                    res.body.movie.should.have.property('directorName');
                    done();
                });
        });        

        it('NOT POST a new Movie Title without title', (done) => {
            let movieTitle = {
                title: '',
                directorName: "J.R.R. Tolkien",
            }
            chai.request(server)
                .post('/movies')
                .send(movieTitle)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.have.property('errors')
                    res.body.errors.forEach(error => {
                        error.should.to.have.property('msg').eql('Title should be between 3 to 50 chars long');
                    })
                    res.body.should.be.a('object');
                    should.not.exist(res.body.movie);
                    done();
                });
        });        

        it('NOT POST a new Movie Title without a valid directorName', (done) => {
            let movieTitle = {
                title: "Star Wars 3",
                directorName: "",
            }
            chai.request(server)
                .post('/movies')
                .send(movieTitle)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.have.property('errors')
                    res.body.errors.forEach(error => {
                        error.should.to.have.property('msg').eql('Director Name should be between 3 to 50 chars long');
                    })
                    res.body.should.be.a('object');
                    should.not.exist(res.body.movie);
                    done();
                });
        });



    });

     
    afterEach((done) => { //Before each test we empty the database
       
        models.MovieTitle.destroy({ where: { id: { [Op.not]: null } } })
        .then(() => done())
        .catch((err) => done(err))

    });

});
