process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js');
let models = require('../db/models')

let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Movies tests', () => {
    
    beforeEach((done) => { //Before each test we empty the database

        models.Movie.destroy({truncate: true}).then(() => 
            done()
        );

    });
    
    /*
      * Test the /GET route
      */
    describe('/GET movies list', () => {
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

        models.Movie.destroy({ truncate: true }).then(() =>
            done()
        );

    });

});