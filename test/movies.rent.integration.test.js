/**
 * Tests Movies behavior
 * 
 */

process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index.js');
const models = require('../db/models');
const seed = require('../db/seeders/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Movies tests', () => {
    
    
    before((done) => { //Before each test we empty the database

        //** Sync database using Seeds UP (Demo Inserts) */
        models.sequelize.sync().then(() => {
            return seed.up();
        }).then(() => {
            done()
        });
    });


    /*
      * Test the POST /movies/rent route
      */    
    describe('POST /movies/rent', () => {
        
        it('Rent a Movie', (done) => {
            let Rent = {
                movie_id: 3,
                user_id: 2,
            }
            chai.request(server)
                .post('/movies/rent')
                .send(Rent)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('msg').eql('Movie successfully rented!');
                    res.body.should.have.property('rent');
                    done();
                });
        });

        it('NOT Rent a Unavailable Movie', (done) => {
            /**
             * movie_id=3 should not be available copies
             */
            let Rent = {
                movie_id: 3,
                user_id: 2,
            }
            chai.request(server)
                .post('/movies/rent')
                .send(Rent)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('msg').eql('Movie not rented! No avaliable copies from given movie_id');
                    done();
                });
        });

        it('NOT Rent a Invalid Movie', (done) => {
            /**
             * movie_id=33333 should not exists
             */
            let Rent = {
                movie_id: 33333,
                user_id: 2,
            }
            chai.request(server)
                .post('/movies/rent')
                .send(Rent)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('msg').eql('Movie not rented! No avaliable copies from given movie_id');
                    done();
                });
        });        

        it('NOT Rent a Movie to a invalid user', (done) => {
            /**
             * user_id=2333 should not exists
             */
            let Rent = {
                movie_id: 2,
                user_id: 2333,
            }
            chai.request(server)
                .post('/movies/rent')
                .send(Rent)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('msg').eql('User not found');
                    done();
                });
        });          


        it('NOT Rent a Movie without movie_id param', (done) => {
            let movieTitle = {
                movie_id: null,
                user_id: 2,
            }
            chai.request(server)
                .post('/movies/rent')
                .send(movieTitle)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.errors.forEach(error => {
                        error.should.to.have.property('msg').eql('movie_id is required');
                    })                   
                    done();
                });
        });

    });

    
    after((done) => { //Before each test we empty the database
       
        /** drop Test Database */
        models.sequelize.drop().then(() => {
            done();
        });

    });
    

});
