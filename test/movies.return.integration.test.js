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
                user_id: 2,
            }
            chai.request(server)
                .post('/movies/return')
                .send(Rent)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('msg').eql('Movie successfully returned!');
                    res.body.should.have.property('movie_return');
                    done();
                });
        });

        it('NOT Return a already returned Movie', (done) => {
            /**
             * movie_copy_id=3 should be already returned by user
             */
            let Rent = {
                movie_copy_id: 4,
                user_id: 2,
            }
            chai.request(server)
                .post('/movies/return')
                .send(Rent)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('msg').eql('Movie already returned!');
                    done();
                });
        });

        it('NOT Return a Invalid Movie', (done) => {
            /**
             * movie_copy_id=33333 should not exists
             */
            let Rent = {
                movie_copy_id: 33333,
                user_id: 2,
            }
            chai.request(server)
                .post('/movies/return')
                .send(Rent)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('msg').eql('No rents found for this movie and/or user!');
                    done();
                });
        });        

        it('NOT Return a Movie to a invalid user', (done) => {
            /**
             * user_id=2333 should not exists
             */
            let Rent = {
                movie_copy_id: 2,
                user_id: 2333,
            }
            chai.request(server)
                .post('/movies/return')
                .send(Rent)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('msg').eql('User not found');
                    done();
                });
        });          


        it('NOT Return a Movie without movie_copy_id param', (done) => {
            let movieTitle = {
                movie_copy_id: null,
                user_id: 2,
            }
            chai.request(server)
                .post('/movies/return')
                .send(movieTitle)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.errors.forEach(error => {
                        error.should.to.have.property('msg').eql('movie_copy_id is required');
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
