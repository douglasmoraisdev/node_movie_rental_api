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
const { getAuthToken } = require('../helpers/test.helper')


const should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Movies tests', () => {


    before((done) => {

        //** Sync database using Seeds UP (Demo Inserts) */
        models.sequelize.sync().then(() => {
            return seed.up();
        }).then(() => {
            done()
        });
    });


    /*
      * Test the POST /movies/return route
      */
    describe('POST /movies/return', () => {

        it('Return a Movie', (done) => {
            let Rent = {
                movie_copy_id: 4,
            }
            getAuthToken().then(token => {

                chai.request(server)
                    .post('/movies/return')
                    .send(Rent)
                    .set('authorization', 'Bearer ' + token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('msg').eql('Movie successfully returned!');
                        res.body.should.have.property('movie_return');
                        done();
                    });
            })
        });

        it('NOT Return a already returned Movie', (done) => {
            /**
             * movie_copy_id=3 should be already returned by user
             */
            let Rent = {
                movie_copy_id: 4,
            }
            getAuthToken().then(token => {

                chai.request(server)
                    .post('/movies/return')
                    .send(Rent)
                    .set('authorization', 'Bearer ' + token)
                    .end((err, res) => {
                        res.should.have.status(422);
                        res.body.should.be.a('object');
                        res.body.should.have.property('msg').eql('No open rents found for this movie and/or user!');
                        done();
                    });
            })
        });

        it('NOT Return a Invalid Movie', (done) => {
            /**
             * movie_copy_id=33333 should not exists
             */
            let Rent = {
                movie_copy_id: 33333,
            }
            getAuthToken().then(token => {
                chai.request(server)
                    .post('/movies/return')
                    .send(Rent)
                    .set('authorization', 'Bearer ' + token)
                    .end((err, res) => {
                        res.should.have.status(422);
                        res.body.should.be.a('object');
                        res.body.should.have.property('msg').eql('No open rents found for this movie and/or user!');
                        done();
                    });
            })
        });

        it('NOT Return a Movie to a invalid user', (done) => {
            let Rent = {
                movie_copy_id: 2,
            }
            getAuthToken().then(token => {
                chai.request(server)
                    .post('/movies/return')
                    .send(Rent)
                    .set('authorization', 'Bearer ' + 'token_wrong')
                    .end((err, res) => {
                        res.should.have.status(401);
                        res.body.should.be.a('object');
                        done();
                    });
            })
        });


        it('NOT Return a Movie without movie_copy_id param', (done) => {
            let movieTitle = {
                movie_copy_id: null,
            }
            getAuthToken().then(token => {
                chai.request(server)
                    .post('/movies/return')
                    .send(movieTitle)
                    .set('authorization', 'Bearer ' + token)
                    .end((err, res) => {
                        res.should.have.status(422);
                        res.body.should.be.a('object');
                        res.body.errors.forEach(error => {
                            error.should.to.have.property('msg').eql('movie_copy_id is required');
                        })
                        done();
                    });
            })
        });

    });


    after((done) => { //Before each test we empty the database

        /** drop Test Database */
        models.sequelize.drop().then(() => {
            done();
        });

    });


});
