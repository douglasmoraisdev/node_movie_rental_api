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

     
    afterEach((done) => { //Before each test we empty the database
       
        models.MovieTitle.destroy({ where: { id: { [Op.not]: null } } })
        .then(() => done())
        .catch((err) => done(err))

    });

});