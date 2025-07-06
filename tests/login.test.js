const request = require('supertest')
const { expect } = require('chai')

describe('Login', () => {
    describe('POST / Login', () => {
        it('Deve retornar 200 com um token em string com credenciais validas', async () => {
            const response = await request('localhost:3000')
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'julio.lima',
                    'senha': '123456'
                })
            expect(response.status).to.be.equal(200)
            expect(response.body.token).to.be.a('string')
        })
    })
})