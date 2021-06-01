const request = require('supertest')
const app = require('../app')
const { Product,sequelize } = require('../models')
const {queryInterface} = sequelize

beforeAll((done) => {
    queryInterface.bulkInsert('Products', 
     [
       {
        name: 'Taro Snack Net Seaweed Pck 70G',
        image_url: 'https://assets.klikindomaret.com/share/20055205/20055205_1.jpg',
        description: 'Rasa Seaweed ukuran 70 Gram',
        barcode_number: '1414100003',
        stock: 5,
        price: 9500,
        stockBefore: 5,
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

beforeAll((done) => {
  queryInterface.bulkInsert('Users',
  [
    {
      id: 5,
      name: "reza",
      email: "r@mail.com",
      password: "asd",
      phone_number: "08828282",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {})
  .then((result) => {
    done()
  })
  .catch((err) => {
    done(err)
  })
})

afterAll((done) => {
    queryInterface.bulkDelete('Products', null, {})
    .then(() => {
      return queryInterface.bulkDelete('Users', null, {})
    })
    .then(() => {
      done()
    })
    .catch((err) => {
        done(err)
    })
})

describe('Create Transaction Midtrans', () => {
  it('Should return response 200', (done) => {
    request(app)
    .post('/pay')
    .send({
      userId: 5,
      gross_amount: 9500,
      item_details: [
        {
          id: 2,
          name: "Taro Snack Net Seaweed Pck 70G",
          price: 9500,
          quantity: 1
        }
      ],
    })
    .end((err, res) => {
      if (err) done(err)
      const{ body, status } = res
      expect(status).toEqual(200)
      expect(typeof body).toEqual("object")
      done()
    })
  })
})

