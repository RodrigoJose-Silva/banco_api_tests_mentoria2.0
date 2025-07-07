const request = require('supertest')
const { expect } = require('chai')
require('dotenv').config()
const post_login = require('../fixtures/post_login.json')
const { log } = require('console')

describe('Login', () => {
    describe('POST / Login', () => {
        const bodyLogin = { ...post_login }
        it('Deve retornar 200 com um token em string com credenciais validas', async () => {
            const response = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)
            expect(response.status).to.be.equal(200)
            expect(response.body.token).to.be.a('string')
        })
        it('Deve retornar 405 quando tentar fazer login com método diferente de POST', async () => {
            let bodyLogin

            const response = await request(process.env.BASE_URL)
                .put('/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)
        
            expect(response.status).to.equal(405)
            expect(response.body.error).to.equal('Método não permitido.')
        })
        it('Deve retornar 400 quando tentar fazer login sem username preenchido', async () => {
            const loginSemUsername = post_login
            loginSemUsername.username = ''
        
            const response = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(loginSemUsername)
        
            expect(response.status).to.equal(400)
            expect(response.body.error).to.equal('Usuário e senha são obrigatórios.')
        })
        it('Deve retornar 400 quando tentar fazer login sem senha preenchida', async () => {
            const loginSemSenha = post_login
            loginSemSenha.senha = ''
        
            const response = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(loginSemSenha)
        
            expect(response.status).to.equal(400)
            expect(response.body.error).to.equal('Usuário e senha são obrigatórios.')
        })
        it('Deve retornar 400 quando tentar fazer login com username preenchido null', async () => {
            const loginUsernamenull = post_login
            loginUsernamenull.username = ''
        
            const response = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(loginUsernamenull)
        
            expect(response.status).to.equal(400)
            expect(response.body.error).to.equal('Usuário e senha são obrigatórios.')
        })
        it('Deve retornar 400 quando tentar fazer login com senha preenchida null', async () => {
            const loginSenhaNull = post_login
            loginSenhaNull.senha = null
        
            const response = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(loginSenhaNull)
        
            expect(response.status).to.equal(400)
            expect(response.body.error).to.equal('Usuário e senha são obrigatórios.')
        })
        it('Deve retornar 401 quando tentar fazer login com username preecnhido invalido', async () => {
            const loginComUsernameInvalido = post_login
            loginComUsernameInvalido.username = 'test.test'
            loginComUsernameInvalido.senha = '123456'
        
            const response = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(loginComUsernameInvalido)
        
            expect(response.status).to.equal(401)
            expect(response.body.error).to.equal('Usuário ou senha inválidos.')
        })
        it('Deve retornar 401 quando tentar fazer login com senha preenchida invalida', async () => {
            const loginComSenhaInvalida = post_login
            loginComSenhaInvalida.senha = 'abc123'
        
            const response = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(loginComSenhaInvalida)
        
            expect(response.status).to.equal(401)
            expect(response.body.error).to.equal('Usuário ou senha inválidos.')
        })
    })
})