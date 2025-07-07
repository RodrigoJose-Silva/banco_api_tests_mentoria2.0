const request = require('supertest')
const post_login = require('../fixtures/post_login.json')

const obterToken = async (username, senha) => {
    const bodyLogin = { ...post_login }
    
    const responseLogin = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)
            return token = responseLogin.body.token
}

module.exports = {
    obterToken
}