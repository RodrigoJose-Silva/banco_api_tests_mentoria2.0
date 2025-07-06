const request = require('supertest')
const { expect } = require('chai')

describe('Transfências', () => {
    describe('POST / Transferências', () => {
        it('Deverá retornar 201 quando a transferência for feita com sucesso com um valor igual o maior que R$ 10 sem token', async ()=> { 
            const responseLogin = await request('localhost:3000')
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'julio.lima',
                    'senha': '123456'
                })
            return token = responseLogin.body.token

            const response = await request('localhost:3000')
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    'contaOrigem': 1,
                    'contaDestino': 2,
                    'valor': 10,
                    'token': ''
                })
            expect(response.statusCode).to.equal(201)
            expect(response.body.message).to.be.equal('Transferência realizada com sucesso.')
        })

        it('Deverá retornar 422 quando a transferência for feita com sucesso com um valor abaixo R$ 10 sem token', async ()=> { 
            const responseLogin = await request('localhost:3000')
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'julio.lima',
                    'senha': '123456'
                })
            return token = responseLogin.body.token

            const response = await request('localhost:3000')
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    'contaOrigem': 1,
                    'contaDestino': 2,
                    'valor': 9.99,
                    'token': ''
                })
            expect(response.statusCode).to.equal(422)
            expect(response.body.message).to.be.equal('O valor da transferência deve ser maior ou igual a R$10,00')
        })
    })
})