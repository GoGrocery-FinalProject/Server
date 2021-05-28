const request = require('supertest')
const app = require('../app')
const { Product,sequelize } = require('../models')
const {queryInterface} = sequelize
const { generateToken } = require('../helpers/jwt')

let token = generateToken({ email: 'muktientutz@mail.com' })

beforeAll((done) => {
    queryInterface.bulkInsert('Products', 
     [
       {     
        id: 1,
        name: 'Taro Snack Net Seaweed Pck 70G',
        barcode_number: '1414100003',
        stock: 5,
        price: 9500,
        stockBefore: 5,
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        id: 2,
        name: 'CHIKI BALLS Rasa Keju 200g',
        barcode_number: '8968659100',
        stock: 10,
        price: 21400,
        stockBefore: 10,
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
    queryInterface.bulkDelete('Products', null, {})
    .then(() => {
        done()
    })
    .catch((err) => {
        done(err)
    })
})

describe('Create Product / Success case', () => {
    it('Should return response 201', (done) => {
        request(app)
            .post('/products')
            .set('token', token)
            .send({
                name: 'CHIKI BALLS Rasa Keju 200g',
                barcode_number: '8968659100',
                stock: 10,
                price: 21400,
                stockBefore: 10,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            .end(function (err, res) {
                if (err) done(err);
                const { body, status } = res
                expect(status).toEqual(201)
                expect(body).toHaveProperty('id', expect.any(Number))
                expect(body).toHaveProperty('name', 'CHIKI BALLS Rasa Keju 200g')
                expect(body).toHaveProperty('barcode_number', '8968659100')
                expect(body).toHaveProperty('stock', 10)
                expect(body).toHaveProperty('price', 21400)
                expect(body).toHaveProperty('stockBefore', 10)

                done()
            })
    })
})

describe('Create Product / Failed case', () => {
    it('Tidak menyertakan access token', (done) => {
        request(app)
            .post('/products')
            .send({
                name: 'CHIKI BALLS Rasa Keju 200g',
                barcode_number: '8968659100',
                stock: 10,
                price: 21400,
                stockBefore: 10,
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
            .post('/products')
            .set('token', token+2)
            .send({
                name: 'CHIKI BALLS Rasa Keju 200g',
                barcode_number: '8968659100',
                stock: 10,
                price: 21400,
                stockBefore: 10,
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
            .post('/products')
            .set('token', token)
            .send({
                name: '',
                barcode_number: '8968659100',
                stock: 10,
                price: 21400,
                stockBefore: 10,
            })
            .end(function (err, res) {
                if (err) done(err);
                const { body, status } = res
                expect(status).toEqual(400)
                expect(body).toHaveProperty('message', 'Name is required')
                done()
            })
        })

        it('stock diisikan angka minus', (done) =>{
            request(app)
            .post('/products')
            .set('token', token)
            .send({
                name: 'CHIKI BALLS Rasa Keju 200g',
                barcode_number: '8968659100',
                stock: -10,
                price: 21400,
                stockBefore: 10,
            })
            .end(function (err, res) {
                if (err) done(err);
                const { body, status } = res
                expect(status).toEqual(400)
                expect(body).toHaveProperty('message', 'Cannot be negative value')
                done()
            })
        })

        it('price diisikan angka minus', (done) =>{
             request(app)
            .post('/products')
            .set('token', token)
            .send({
                name: 'CHIKI BALLS Rasa Keju 200g',
                barcode_number: '8968659100',
                stock: 10,
                price: -21400,
                stockBefore: 10,
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
                .post('/products')
                .set('token', token)
                .send({
                    name: 'CHIKI BALLS Rasa Keju 200g',
                    barcode_number: '8968659100',
                    stock: '10',
                    price: 21400,
                    stockBefore: 10,
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

let idProduct = 1
describe('Update Product / Success case', () => {
    it('Should return response 201', (done) => {

        request(app)
        .put('/products/' + idProduct)
        .set('token', token)
        .send({
            id: idProduct,
            name: 'CHIKI BALLS Rasa Keju 100g',
            barcode_number: '8968659100',
            stock: 5,
            price: 11400,
            stockBefore: 5
        })
        .end(function (err, res) {
            if (err) done(err);
            const {body, status} = res
            expect(status).toEqual(200)
            expect(body).toHaveProperty('message', 'Data has been updated')
            
            done()
        })
    })
})

describe('Update Product / Failed case', () => {
    it('Tidak menyertakan access token', (done) => {
        request(app)
            .post('/products')
            .send({
                id: idProduct,
                name: 'CHIKI BALLS Rasa Keju 100g',
                barcode_number: '8968659100',
                stock: 5,
                price: 11400,
                stockBefore: 5
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
            .post('/products')
            .set('token', token+2)
            .send({
                id: idProduct,
                name: 'CHIKI BALLS Rasa Keju 100g',
                barcode_number: '8968659100',
                stock: 5,
                price: 11400,
                stockBefore: 5
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
            .post('/products')
            .set('token', token)
            .send({
                name: '',
                barcode_number: '8968659100',
                stock: 5,
                price: 11400,
                stockBefore: 5
            })
            .end(function (err, res) {
                if (err) done(err);
                const { body, status } = res
                expect(status).toEqual(400)
                expect(body).toHaveProperty('message', 'Name is required')
                done()
            })
        })

        it('stock diisikan angka minus', (done) =>{
            request(app)
            .post('/products')
            .set('token', token)
            .send({
                name: 'CHIKI BALLS Rasa Keju 100g',
                barcode_number: '8968659100',
                stock: -5,
                price: 11400,
                stockBefore: 5
            })
            .end(function (err, res) {
                if (err) done(err);
                const { body, status } = res
                expect(status).toEqual(400)
                expect(body).toHaveProperty('message', 'Cannot be negative value')
                done()
            })
        })

        it('price diisikan angka minus', (done) =>{
             request(app)
            .post('/products')
            .set('token', token)
            .send({
                name: 'CHIKI BALLS Rasa Keju 100g',
                barcode_number: '8968659100',
                stock: 5,
                price: 11400,
                stockBefore: 5
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
                .post('/products')
                .set('token', token)
                .send({
                    name: 'CHIKI BALLS Rasa Keju 100g',
                    barcode_number: '8968659100',
                    stock: 'awa',
                    price: 11400,
                    stockBefore: 5
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

describe('Delete Product / Success case', () => {
    it('Should return response 200', (done) => {

        request(app)
        .delete('/products/' + 2)
        .set('token', token)
        .end(function (err, res) {
            if (err) done(err);
            const {body, status} = res
            expect(status).toEqual(200)
            expect(body).toHaveProperty('message', 'Product success to delete')
            
            done()
        })
    })
})

describe('Delete Product / Failed case', () => {
    it('Tidak menyertakan access token', (done) => {
        request(app)
        .delete('/products/' + idProduct)
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
        .delete('/products/' + idProduct)
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