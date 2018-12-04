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
describe('Users tests', () => {
    
    before((done) => { //Before each test we empty the database

        //** Sync database using Seeds UP (Demo Inserts) */
        models.sequelize.sync().then(() => {
            return seed.up();
        }).then(() => {
            done()
        });

    });
    
    /*
      * Test the GET / route
      */
    describe('Tests Route /users', () => {

        it('Register a user', (done) => {
            let userToAuth = {
                username: 'test_user_1@gmail.com',
                password: 'banana',
                firstName: 'Teste User Um'
            }
            chai.request(server)
                .post('/users/register')
                .send(userToAuth)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.user.should.have.property('email').eql('test_user_1@gmail.com')
                    res.body.user.should.have.property('firstName').eql('Teste User Um')
                    done();
                });
        });

        it('Authenticate a user', (done) => {
            let userToAuth = {
                username: 'test_user_1@gmail.com',
                password: 'banana'
            }
            chai.request(server)
                .post('/users/authenticate')
                .send(userToAuth)
                .end((err, res) => {

                    res.should.have.status(200);
                    res.body.should.have.property('token')
                    done();
                });
        });

        it('GET a private route (movies) with a auth user ', (done) => {
            let userToAuth = {
                username: 'test_user_1@gmail.com',
                password: 'banana'
            }
            chai.request(server)
                .post('/users/authenticate')
                .send(userToAuth)
                .end((err, res) => {

                    let validToken = res.body.token

                    chai.request(server)
                        .get('/movies/')
                        .set('Content-Type', 'application/json')
                        .set('authorization', 'Bearer ' + validToken)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('array');
                            res.body.length.should.be.eql(4);
                            done();
                        });
                })

        });

        it('GET a private route (movies) with a non-auth user ', (done) => {
            chai.request(server)
                .get('/movies/')
                .set('Content-Type', 'application/json')
                .set('authorization', 'Bearer _123_invalid_token_')
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.have.property('message')
                    done();
                });
        });        


              
    });

    
    after((done) => { //Before each test we empty the database
       
        //** drop Test Database */
        models.sequelize.drop().then(() => {
            done();
        });

    });
    

});
