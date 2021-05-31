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

describe('Create Report / Success case', () => {
    it('Should return response 201', (done) => {
        request(app)
            .post('/reports')
            .set('token', token)
            .send({
                products: "[{\"ProductId\":1,\"stockRecorded\":4,\"stockReal\":4,\"price\":3500},{\"ProductId\":2,\"stockRecorded\":1,\"stockReal\":1,\"price\":4321},{\"ProductId\":3,\"stockRecorded\":4,\"stockReal\":4,\"price\":24566},{\"ProductId\":4,\"stockRecorded\":5,\"stockReal\":5,\"price\":412},{\"ProductId\":5,\"stockRecorded\":4,\"stockReal\":4,\"price\":421412}]",
                transactions: "[{\"id\":1,\"UserId\":1,\"Products\":\"[{ProductId:1, quantity:3},{ProductId:2, quantity:3},{ProductId:3, quantity:3}]\",\"totalPrice\":10500,\"OrderId\":\"OD101-12197\"},{\"id\":2,\"UserId\":1,\"Products\":\"[{ProductId:1, quantity:3},{ProductId:2, quantity:3},{ProductId:3, quantity:3}]\",\"totalPrice\":10500,\"OrderId\":\"OD101-12198\"}]",
                income: 50000,
                loss: 0
            })
            .end(function (err, res) {
                if (err) done(err);
                const { body, status } = res
                expect(status).toEqual(201)
                expect(body).toHaveProperty('id', expect.any(Number))
                expect(body).toHaveProperty('products', "[{\"ProductId\":1,\"stockRecorded\":4,\"stockReal\":4,\"price\":3500},{\"ProductId\":2,\"stockRecorded\":1,\"stockReal\":1,\"price\":4321},{\"ProductId\":3,\"stockRecorded\":4,\"stockReal\":4,\"price\":24566},{\"ProductId\":4,\"stockRecorded\":5,\"stockReal\":5,\"price\":412},{\"ProductId\":5,\"stockRecorded\":4,\"stockReal\":4,\"price\":421412}]")
                expect(body).toHaveProperty('transactions', "[{\"id\":1,\"UserId\":1,\"Products\":\"[{ProductId:1, quantity:3},{ProductId:2, quantity:3},{ProductId:3, quantity:3}]\",\"totalPrice\":10500,\"OrderId\":\"OD101-12197\"},{\"id\":2,\"UserId\":1,\"Products\":\"[{ProductId:1, quantity:3},{ProductId:2, quantity:3},{ProductId:3, quantity:3}]\",\"totalPrice\":10500,\"OrderId\":\"OD101-12198\"}]")
                expect(body).toHaveProperty('income', 50000)
                expect(body).toHaveProperty('loss', expect.any(Number))

                done()
            })
    })
})

describe('Create Report / Failed case', () => {
    it('Tidak menyertakan access token', (done) => {
        request(app)
            .post('/reports')
            .send({
                products: "[{\"ProductId\":1,\"stockRecorded\":4,\"stockReal\":4,\"price\":3500},{\"ProductId\":2,\"stockRecorded\":1,\"stockReal\":1,\"price\":4321},{\"ProductId\":3,\"stockRecorded\":4,\"stockReal\":4,\"price\":24566},{\"ProductId\":4,\"stockRecorded\":5,\"stockReal\":5,\"price\":412},{\"ProductId\":5,\"stockRecorded\":4,\"stockReal\":4,\"price\":421412}]",
                transactions: "[{\"id\":1,\"UserId\":1,\"Products\":\"[{ProductId:1, quantity:3},{ProductId:2, quantity:3},{ProductId:3, quantity:3}]\",\"totalPrice\":10500,\"OrderId\":\"OD101-12197\"},{\"id\":2,\"UserId\":1,\"Products\":\"[{ProductId:1, quantity:3},{ProductId:2, quantity:3},{ProductId:3, quantity:3}]\",\"totalPrice\":10500,\"OrderId\":\"OD101-12198\"}]",
                income: 50000,
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
                products: "[{\"ProductId\":1,\"stockRecorded\":4,\"stockReal\":4,\"price\":3500},{\"ProductId\":2,\"stockRecorded\":1,\"stockReal\":1,\"price\":4321},{\"ProductId\":3,\"stockRecorded\":4,\"stockReal\":4,\"price\":24566},{\"ProductId\":4,\"stockRecorded\":5,\"stockReal\":5,\"price\":412},{\"ProductId\":5,\"stockRecorded\":4,\"stockReal\":4,\"price\":421412}]",
                transactions: "[{\"id\":1,\"UserId\":1,\"Products\":\"[{ProductId:1, quantity:3},{ProductId:2, quantity:3},{ProductId:3, quantity:3}]\",\"totalPrice\":10500,\"OrderId\":\"OD101-12197\"},{\"id\":2,\"UserId\":1,\"Products\":\"[{ProductId:1, quantity:3},{ProductId:2, quantity:3},{ProductId:3, quantity:3}]\",\"totalPrice\":10500,\"OrderId\":\"OD101-12198\"}]",
                income: 50000,
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

        it('field yg required tidak diisi', (done) =>{
            request(app)
            .post('/reports')
            .set('token', token)
            .send({
                products: "[{\"ProductId\":1,\"stockRecorded\":4,\"stockReal\":4,\"price\":3500},{\"ProductId\":2,\"stockRecorded\":1,\"stockReal\":1,\"price\":4321},{\"ProductId\":3,\"stockRecorded\":4,\"stockReal\":4,\"price\":24566},{\"ProductId\":4,\"stockRecorded\":5,\"stockReal\":5,\"price\":412},{\"ProductId\":5,\"stockRecorded\":4,\"stockReal\":4,\"price\":421412}]",
                transactions: '',
                income: 50000,
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

        it('Income diisikan angka minus', (done) =>{
            request(app)
            .post('/reports')
            .set('token', token)
            .send({
                products: "[{\"ProductId\":1,\"stockRecorded\":4,\"stockReal\":4,\"price\":3500},{\"ProductId\":2,\"stockRecorded\":1,\"stockReal\":1,\"price\":4321},{\"ProductId\":3,\"stockRecorded\":4,\"stockReal\":4,\"price\":24566},{\"ProductId\":4,\"stockRecorded\":5,\"stockReal\":5,\"price\":412},{\"ProductId\":5,\"stockRecorded\":4,\"stockReal\":4,\"price\":421412}]",
                transactions: "[{\"id\":1,\"UserId\":1,\"Products\":\"[{ProductId:1, quantity:3},{ProductId:2, quantity:3},{ProductId:3, quantity:3}]\",\"totalPrice\":10500,\"OrderId\":\"OD101-12197\"},{\"id\":2,\"UserId\":1,\"Products\":\"[{ProductId:1, quantity:3},{ProductId:2, quantity:3},{ProductId:3, quantity:3}]\",\"totalPrice\":10500,\"OrderId\":\"OD101-12198\"}]",
                income: -50000,
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
                    products: "[{\"ProductId\":1,\"stockRecorded\":4,\"stockReal\":4,\"price\":3500},{\"ProductId\":2,\"stockRecorded\":1,\"stockReal\":1,\"price\":4321},{\"ProductId\":3,\"stockRecorded\":4,\"stockReal\":4,\"price\":24566},{\"ProductId\":4,\"stockRecorded\":5,\"stockReal\":5,\"price\":412},{\"ProductId\":5,\"stockRecorded\":4,\"stockReal\":4,\"price\":421412}]",
                    transactions: "[{\"id\":1,\"UserId\":1,\"Products\":\"[{ProductId:1, quantity:3},{ProductId:2, quantity:3},{ProductId:3, quantity:3}]\",\"totalPrice\":10500,\"OrderId\":\"OD101-12197\"},{\"id\":2,\"UserId\":1,\"Products\":\"[{ProductId:1, quantity:3},{ProductId:2, quantity:3},{ProductId:3, quantity:3}]\",\"totalPrice\":10500,\"OrderId\":\"OD101-12198\"}]",
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
})