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
describe('Avaliable Movies tests', () => {
    
    /*
    beforeEach((done) => { //Before each test we empty the database

        models.MovieTitle.destroy({ where: { id: { [Op.not]: null } } })
        .then(() => done())
        .catch((err) => done(err))

    });
    */
    
    /*
      * Test the GET /movies/avaliable route
      */
    describe('GET /movies/avaliable', () => {
        it('it should GET all the avaliable movies', (done) => {
            chai.request(server)
                .get('/movies/avaliable')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(4);
                    res.body.forEach(itens => {
                        itens.should.have.property('avaliables');
                    })                    
                    done();
                });
        });
    });


    /*
      * Test the GET /movies/avaliable/{title} route
      */
    describe('GET /movies/avaliable', () => {
        it('it should GET all the avaliable movies by a givin title name query', (done) => {
            chai.request(server)
                .get('/movies/avaliable/bytitle/Avangers 2')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    res.body.forEach(itens => {
                        itens.should.have.property('avaliables');
                        itens.should.have.property('title').eql("Avangers 2");
                    })
                    done();
                });
        });
    });    

    /*
    afterEach((done) => { //Before each test we empty the database
       
        models.MovieTitle.destroy({ where: { id: { [Op.not]: null } } })
        .then(() => done())
        .catch((err) => done(err))

    });
    */

});
