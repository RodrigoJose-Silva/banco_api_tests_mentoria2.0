const request = require('supertest')
const { expect } = require('chai')
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao')
const post_trasnferencias = require('../fixtures/post_trasnferencias.json')

describe('Transfências', () => {
    describe('POST / Transferências', () => {
        let token

        beforeEach(async () => {
            token = await obterToken('julio.lima', '123456')
        })
        
        it('Deverá retornar 201 quando a transferência for feita com sucesso com um valor igual o maior que R$ 10 sem token', async ()=> { 
            const bodyTransferencias = {...post_trasnferencias}

            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias)
            expect(response.statusCode).to.equal(201)
            expect(response.body.message).to.be.equal('Transferência realizada com sucesso.')
        })

        it('Deverá retornar 422 quando a transferência for feita com sucesso com um valor abaixo R$ 10 sem token', async ()=> { 
            const bodyTransferencias = {...post_trasnferencias}
            bodyTransferencias.valor= 9.99

            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias)
            expect(response.statusCode).to.equal(422)
            expect(response.body.error).to.be.equal('O valor da transferência deve ser maior ou igual a R$10,00.')
        })
    })
})