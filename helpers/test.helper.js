const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index.js');

const should = chai.should();

chai.use(chaiHttp);

async function getAuthToken() {
    /**
     * Generate a User Auth valid Token
     */
    let agent = chai.request.agent(server)
    let validToken = await agent.post('/users/authenticate')
        .send({
            //username: 'j.silva@gmail.com',
            //password: 'abacate'
            username: 'm.rodrigues@gmail.com',
            password: '1234'
        }).then((token) => {
            return token
        })
    return validToken.body.token
}  

module.exports = { getAuthToken }
