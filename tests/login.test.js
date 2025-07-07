const request = require('supertest')
const { expect } = require('chai')
require('dotenv').config()
const post_login = require('../fixtures/post_login.json')

describe('Login', () => {
    describe('POST / Login', () => {
        const bodyLogin = {...post_login}
        it('Deve retornar 200 com um token em string com credenciais validas', async () => {
            const response = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)
            expect(response.status).to.be.equal(200)
            expect(response.body.token).to.be.a('string')
        })
    })
})