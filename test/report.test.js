const request = require('supertest')
const app = require('../app')
const { Report, sequelize } = require('../models')
const {queryInterface} = sequelize
const { generateToken } = require('../helpers/jwt')

let token = generateToken({
    id: 1,
    name: 'Mukti Metronom',
    email: 'muktientutz@mail.com',
    phone_number: '081908091808'
})

beforeAll((done) => {
    queryInterface.bulkInsert('Reports', 
     [
       {
        id: 1,
        products: "[{\"ProductId\":1,\"stockRecorded\":4,\"stockReal\":4,\"price\":3500},{\"ProductId\":2,\"stockRecorded\":1,\"stockReal\":1,\"price\":4321},{\"ProductId\":3,\"stockRecorded\":4,\"stockReal\":4,\"price\":24566},{\"ProductId\":4,\"stockRecorded\":5,\"stockReal\":5,\"price\":412},{\"ProductId\":5,\"stockRecorded\":4,\"stockReal\":4,\"price\":421412}]",
        transactions: "[{\"id\":1,\"UserId\":1,\"Products\":\"[{ProductId:1, quantity:3},{ProductId:2, quantity:3},{ProductId:3, quantity:3}]\",\"totalPrice\":10500,\"OrderId\":\"OD101-12197\"},{\"id\":2,\"UserId\":1,\"Products\":\"[{ProductId:1, quantity:3},{ProductId:2, quantity:3},{ProductId:3, quantity:3}]\",\"totalPrice\":10500,\"OrderId\":\"OD101-12198\"}]",
        income: 50000,
        loss: 0,
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        id: 2,
        products: "[{\"ProductId\":1,\"stockRecorded\":4,\"stockReal\":4,\"price\":3500},{\"ProductId\":2,\"stockRecorded\":1,\"stockReal\":1,\"price\":4321},{\"ProductId\":3,\"stockRecorded\":4,\"stockReal\":4,\"price\":24566},{\"ProductId\":4,\"stockRecorded\":5,\"stockReal\":5,\"price\":412}]",
        transactions: "[{\"id\":1,\"UserId\":1,\"Products\":\"[{ProductId:1, quantity:3},{ProductId:2, quantity:3},{ProductId:3, quantity:3}]\",\"totalPrice\":10500,\"OrderId\":\"OD101-12197\"},{\"id\":2,\"UserId\":1,\"Products\":\"[{ProductId:1, quantity:3}]",
        income: 50000,
        loss: 0,
        createdAt: new Date(),
        updatedAt: new Date()
       }
      ], {})
      .then(() => {
          done()
      })
      .catch((err) => {
          done(err)
      })
})

afterAll((done) => {
    queryInterface.bulkDelete('Reports', null, {})
    .then(() => {
        done()
    })
    .catch((err) => {
        done(err)
    })
})

describe('Read Report / Success case', () => {
    it('Should return response 200', (done) => {
        request(app)
            .get('/reports')
            .set('token', token)
            .end(function (err, res) {
                if (err) done(err);
                const { body, status } = res
                expect(status).toEqual(200)
                expect(typeof body).toEqual('object')

                done()
            })
    })
})

describe('Read Report / Failed case', () => {
    it('Tidak menyertakan access token', (done) => {
        request(app)
            .get('/reports')
            .end(function (err, res) {
                if (err) done(err);
                const { body, status } = res
                expect(status).toEqual(401)
                expect(body).toHaveProperty('message', 'Not Authenticated')
                done()
            })
    })

    it('Token yang digunakan tidak valid', (done) =>{
            request(app)
                .get('/reports')
                .set('token', token+2)
                .end(function (err, res) {
                    if (err) done(err);
                    const { body, status } = res
                    expect(status).toEqual(401)
                    expect(body).toHaveProperty('message', 'Not Authenticated')
                    done()
                })
        })
})


let id = 1
describe('Read Report by id / Success case', () => {
    it('Should return response 200', (done) => {
        request(app)
            .get('/reports/'+id)
            .set('token', token)
            .end(function (err, res) {
                if (err) done(err);
                const { body, status } = res
                expect(status).toEqual(200)
                expect(body).toHaveProperty('id',  id)
                expect(body).toHaveProperty('products', '[{\"ProductId\":1,\"stockRecorded\":4,\"stockReal\":4,\"price\":3500},{\"ProductId\":2,\"stockRecorded\":1,\"stockReal\":1,\"price\":4321},{\"ProductId\":3,\"stockRecorded\":4,\"stockReal\":4,\"price\":24566},{\"ProductId\":4,\"stockRecorded\":5,\"stockReal\":5,\"price\":412},{\"ProductId\":5,\"stockRecorded\":4,\"stockReal\":4,\"price\":421412}]')
                expect(body).toHaveProperty('transactions', '[{\"id\":1,\"UserId\":1,\"Products\":\"[{ProductId:1, quantity:3},{ProductId:2, quantity:3},{ProductId:3, quantity:3}]\",\"totalPrice\":10500,\"OrderId\":\"OD101-12197\"},{\"id\":2,\"UserId\":1,\"Products\":\"[{ProductId:1, quantity:3},{ProductId:2, quantity:3},{ProductId:3, quantity:3}]\",\"totalPrice\":10500,\"OrderId\":\"OD101-12198\"}]')
                expect(body).toHaveProperty('income', 50000)
                expect(body).toHaveProperty('loss', 0)

                done()
            })
    })
})

describe('Read Report by id/ Failed case', () => {
    it('Tidak menyertakan access token', (done) => {
        request(app)
            .get('/reports/'+ id)
            .end(function (err, res) {
                if (err) done(err);
                const { body, status } = res
                expect(status).toEqual(401)
                expect(body).toHaveProperty('message', 'Not Authenticated')
                done()
            })
    })

    it('Token yang digunakan tidak valid', (done) =>{
            request(app)
            .get('/reports/'+ id)
                .set('token', token+2)
                .end(function (err, res) {
                    if (err) done(err);
                    const { body, status } = res
                    expect(status).toEqual(401)
                    expect(body).toHaveProperty('message', 'Not Authenticated')
                    done()
                })
        })

        it('id yang digunakan tidak valid', (done) =>{
            request(app)
            .get('/reports/'+ id+2000)
                .set('token', token)
                .end(function (err, res) {
                    if (err) done(err);
                    const { body, status } = res
                    expect(status).toEqual(404)
                    expect(typeof res.body).toEqual('object')
                    expect(body).toHaveProperty('message', 'Data not found')
                    done()
                })
        })
})

describe('Create Report / Success case', () => {
    it('Should return response 201', (done) => {
        request(app)
            .post('/reports')
            .set('token', token)
            .send({
                products: "[{\"ProductId\":1,\"stockRecorded\":4,\"stockReal\":4,\"price\":3500}]",
                transactions: "[{\"id\":1,\"UserId\":1,\"Products\":\"[{ProductId:1, quantity:3}]",
                income: 3000,
                loss: 0
            })
            .end(function (err, res) {
                if (err) done(err);
                const { body, status } = res
                expect(status).toEqual(201)
                expect(body).toHaveProperty('id', expect.any(Number))
                expect(body).toHaveProperty('products', "[{\"ProductId\":1,\"stockRecorded\":4,\"stockReal\":4,\"price\":3500}]")
                expect(body).toHaveProperty('transactions', "[{\"id\":1,\"UserId\":1,\"Products\":\"[{ProductId:1, quantity:3}]")
                expect(body).toHaveProperty('income', 3000)
                expect(body).toHaveProperty('loss', 0)

                done()
            })
    })
})

describe('Create Report / Failed case', () => {
    it('Tidak menyertakan access token', (done) => {
        request(app)
            .post('/reports')
            .send({
                products: "[{\"ProductId\":1,\"stockRecorded\":4,\"stockReal\":4,\"price\":3500}]",
                transactions: "[{\"id\":1,\"UserId\":1,\"Products\":\"[{ProductId:1, quantity:3}]",
                income: 3000,
                loss: 0
            })
            .end(function (err, res) {
                if (err) done(err);
                const { body, status } = res
                expect(status).toEqual(401)
                expect(body).toHaveProperty('message', 'Not Authenticated')
                done()
            })
    })

    it('Menyertakan access token tapi bukan punya admin', (done) => {
        request(app)
            .post('/reports')
            .set('token', token+2)
            .send({
                products: "[{\"ProductId\":1,\"stockRecorded\":4,\"stockReal\":4,\"price\":3500}]",
                transactions: "[{\"id\":1,\"UserId\":1,\"Products\":\"[{ProductId:1, quantity:3}]",
                income: 3000,
                loss: 0
            })
            .end(function (err, res) {
                if (err) done(err);
                const { body, status } = res
                expect(status).toEqual(401)
                expect(body).toHaveProperty('message', 'Not Authenticated')
                done()
            })
    })

        it('field product tidak diisi', (done) =>{
            request(app)
            .post('/reports')
            .set('token', token)
            .send({
                products: '',
                transactions: '[{\"id\":1,\"UserId\":1,\"Products\":\"[{ProductId:1, quantity:3}]',
                income: 3000,
                loss: 0
            })
            .end(function (err, res) {
                if (err) done(err);
                const { body, status } = res
                expect(status).toEqual(400)
                expect(body).toHaveProperty('message', 'List of Product cannot be empty')
                done()
            })
        })

        it('field yg required tidak diisi', (done) =>{
            request(app)
            .post('/reports')
            .set('token', token)
            .send({
                products: "[{\"ProductId\":1,\"stockRecorded\":4,\"stockReal\":4,\"price\":3500}]",
                transactions: '',
                income: 3000,
                loss: 0
            })
            .end(function (err, res) {
                if (err) done(err);
                const { body, status } = res
                expect(status).toEqual(400)
                expect(body).toHaveProperty('message', 'List of Transaction cannot be empty')
                done()
            })
        })

        it('income diisikan null', (done) =>{
            request(app)
            .post('/reports')
            .set('token', token)
            .send({
                products: "[{\"ProductId\":1,\"stockRecorded\":4,\"stockReal\":4,\"price\":3500}]",
                transactions: "[{\"id\":1,\"UserId\":1,\"Products\":\"[{ProductId:1, quantity:3}]",
                income: '',
                loss: 0
            })
            .end(function (err, res) {
                if (err) done(err);
                const { body, status } = res
                expect(status).toEqual(400)
                expect(body).toHaveProperty('message', 'Must number, Cannot left empty')
                done()
            })
        })

        it('Income diisikan angka minus', (done) =>{
            request(app)
            .post('/reports')
            .set('token', token)
            .send({
                products: "[{\"ProductId\":1,\"stockRecorded\":4,\"stockReal\":4,\"price\":3500}]",
                transactions: "[{\"id\":1,\"UserId\":1,\"Products\":\"[{ProductId:1, quantity:3}]",
                income: -3000,
                loss: 0
            })
            .end(function (err, res) {
                if (err) done(err);
                const { body, status } = res
                expect(status).toEqual(400)
                expect(body).toHaveProperty('message', 'Cannot be negative value')
                done()
            })
        })

        it('field diisikan tipe data yg tidak sesuai', (done) =>{
            request(app)
                .post('/reports')
                .set('token', token)
                .send({
                    products: "[{\"ProductId\":1,\"stockRecorded\":4,\"stockReal\":4,\"price\":3500}]",
                    transactions: "[{\"id\":1,\"UserId\":1,\"Products\":\"[{ProductId:1, quantity:3}]",
                    income: 'apaaa',
                    loss: 0
                })
                .end(function (err, res) {
                    if (err) done(err);
                    const { body, status } = res
                    expect(status).toEqual(400)
                    expect(body).toHaveProperty('message', 'Must number')
                    done()
                })
        })

        it('loss diisikan null', (done) =>{
            request(app)
            .post('/reports')
            .set('token', token)
            .send({
                products: "[{\"ProductId\":1,\"stockRecorded\":4,\"stockReal\":4,\"price\":3500}]",
                transactions: "[{\"id\":1,\"UserId\":1,\"Products\":\"[{ProductId:1, quantity:3}]",
                income: 0,
                loss: ''
            })
            .end(function (err, res) {
                if (err) done(err);
                const { body, status } = res
                expect(status).toEqual(400)
                expect(body).toHaveProperty('message', 'Must number, Cannot left empty')
                done()
            })
        })

        it('field loss diisikan tipe data yg tidak sesuai', (done) =>{
            request(app)
                .post('/reports')
                .set('token', token)
                .send({
                    products: "[{\"ProductId\":1,\"stockRecorded\":4,\"stockReal\":4,\"price\":3500}]",
                    transactions: "[{\"id\":1,\"UserId\":1,\"Products\":\"[{ProductId:1, quantity:3}]",
                    income: 0,
                    loss: 'waw'
                })
                .end(function (err, res) {
                    if (err) done(err);
                    const { body, status } = res
                    expect(status).toEqual(400)
                    expect(body).toHaveProperty('message', 'Must number')
                    done()
                })
        })
})

describe('Delete Report / Success case', () => {
    it('Should return response 200', (done) => {

        request(app)
        .delete('/reports/' + 2)
        .set('token', token)
        .end(function (err, res) {
            if (err) done(err);
            const {body, status} = res
            expect(status).toEqual(200)
            expect(body).toHaveProperty('message', 'Report success to delete')
            
            done()
        })
    })
})

describe('Delete Report / Failed case', () => {
    it('Tidak menyertakan access token', (done) => {
        request(app)
        .delete('/reports/' + 1)
            .end(function (err, res) {
                if (err) done(err);
                const { body, status } = res
                expect(status).toEqual(401)
                expect(body).toHaveProperty('message', 'Not Authenticated')
                done()
            })
    })
    it('Menyertakan access token tapi bukan punya admin', (done) => {
        request(app)
        .delete('/reports/' + 1)
        .set('token', token+1)
            .end(function (err, res) {
                if (err) done(err);
                const { body, status } = res
                expect(status).toEqual(401)
                expect(body).toHaveProperty('message', 'Not Authenticated')

                done()
            })
    })
    it('Id tidak ditemukan', (done) => {
        request(app)
        .delete('/reports/' + 10)
        .set('token', token)
            .end(function (err, res) {
                if (err) done(err);
                const { body, status } = res
                expect(status).toEqual(500)
                expect(body).toHaveProperty('message', 'Internal Server Error')

                done()
            })
    })
})