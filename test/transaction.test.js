const request = require('supertest')
const app = require('../app')
const { Transaction, sequelize } = require('../models')
const {queryInterface} = sequelize
const { generateToken } = require('../helpers/jwt')
const { Op } = require('sequelize')

let token = generateToken({
    id: 2,
    name: 'Benidictivity',
    email: 'benidictivity@mail.com',
    phone_number: '081908091808'
})

let tokenAdmin = generateToken({
    id: 1,
    name: 'Mukti Metronom',
    email: 'muktientutz@mail.com',
    phone_number: '081908091808'
})

beforeAll((done) => {
    queryInterface.bulkInsert('Transactions', 
    [
        {
            id: 1,
            UserId: 2,
            products: '[{\"ProductId:\"1,\"quantity:\"2,\"price\":3500\"},\"{\"ProductId:\"2,\"quantity:\"3,\"price\":5500\"}]',
            order_id: 'OD101-12197',
            totalPrice: 20000,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 2,
            UserId: 3,
            products: '[{\"ProductId:\"10,\"quantity:\"20,\"price\":35000\"},\"{\"ProductId:\"20,\"quantity:\"30,\"price\":55000\"}]',
            order_id: 'OD101-12198',
            totalPrice: 194800,
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
    Transaction.destroy({
        where: {
            [Op.not]: [
                {id: [1, 2]}
            ]
        }
    })
        .then(() => {
            done()
        })
        .catch((err) => {
            done(err)
        })
})

describe('Create Transaction', () => {
    it('Error No Token', (done) => {
        const body = {
            products: '[{\"ProductId:\"1,\"quantity:\"2,\"price\":3500\"}]',
            order_id: 'OD101-12197',
            totalPrice: 20000,
        }
        request(app)
            .post('/transactions')
            .send(body)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(401)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('message', 'Not Authenticated')
                    done()
                }
            })
    })

    it('Error Invalid Token', (done) => {
        const body = {
            products: '[{\"ProductId:\"1,\"quantity:\"2,\"price\":3500\"}]',
            order_id: 'OD101-12197',
            totalPrice: 20000,
        }
        request(app)
            .post('/transactions')
            .set('token', token+2)
            .send(body)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(401)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('message', 'Not Authenticated')
                    done()
                }
            })
    })

    it('Error Not Required Token', (done) => {
        const body = {
            products: '[{\"ProductId:\"1,\"quantity:\"2,\"price\":3500\"}]',
            order_id: 'OD101-12197',
            totalPrice: 20000,
        }
        request(app)
            .post('/transactions')
            .set('token', tokenAdmin)
            .send(body)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(401)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('message', 'You must login first')
                    done()
                }
            })
    })

    it('Error No Products', (done) => {
        const body = {
            products: '',
            order_id: 'OD101-12197',
            totalPrice: 20000,
        }
        request(app)
            .post('/transactions')
            .set('token', token)
            .send(body)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('message', 'List of products cannot be empty')
                    done()
                }
            })
    })

    it('Error No Order ID', (done) => {
        const body = {
            products: '[{\"ProductId:\"1,\"quantity:\"2,\"price\":3500\"}]',
            order_id: '',
            totalPrice: 20000,
        }
        request(app)
            .post('/transactions')
            .set('token', token)
            .send(body)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('message', 'Order ID cannot be empty')
                    done()
                }
            })
    })

    it('Error Not Valid Input of Total Price', (done) => {
        const body = {
            products: '[{\"ProductId:\"1,\"quantity:\"2,\"price\":3500\"}]',
            order_id: 'OD101-12197',
            totalPrice: 'MR. COIP',
        }
        request(app)
            .post('/transactions')
            .set('token', token)
            .send(body)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('message', 'Must number')
                    done()
                }
            })
    })

    it('Error Not Positive Value of Total Price', (done) => {
        const body = {
            products: '[{\"ProductId:\"1,\"quantity:\"2,\"price\":3500\"}]',
            order_id: 'OD101-12197',
            totalPrice: -20000,
        }
        request(app)
            .post('/transactions')
            .set('token', token)
            .send(body)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('message', 'Cannot be negative value')
                    done()
                }
            })
    })

    it('Success', (done) => {
        const body = {
            products: '[{\"ProductId:\"1,\"quantity:\"2,\"price\":3500\"}]',
            order_id: 'OD101-12197',
            totalPrice: 20000,
        }
        request(app)
            .post('/transactions')
            .set('token', token)
            .send(body)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(201)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('id')
                    expect(typeof res.body.id).toEqual('number')
                    expect(res.body).toHaveProperty('UserId', 2)
                    expect(res.body).toHaveProperty('products', body.products)
                    expect(res.body).toHaveProperty('order_id', body.order_id)
                    expect(res.body).toHaveProperty('totalPrice', body.totalPrice)
                    expect(res.body).toHaveProperty('status', 'unpaid')
                    done()
                }
            })
    })
})

describe('Read Transaction', () => {
    it('Error No Token', (done) => {
        request(app)
            .get('/transactions')
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(401)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('message', 'Not Authenticated')
                    done()
                }
            })
    })

    it('Error Invalid Token', (done) => {
        request(app)
            .get('/transactions')
            .set('token', token+2)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(401)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('message', 'Not Authenticated')
                    done()
                }
            })
    })

    it('Error Not Required Token', (done) => {
        request(app)
            .get('/transactions')
            .set('token', token)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(401)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('message', 'Admin only')
                    done()
                }
            })
    })

    it('Success', (done) => {
        request(app)
            .get('/transactions')
            .set('token', tokenAdmin)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(200)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('transactions')
                    done()
                }
            })
    })
})

describe('Read Transaction by User ID', () => {
    it('Error No Token', (done) => {
        request(app)
            .get('/transactions/2')
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(401)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('message', 'Not Authenticated')
                    done()
                }
            })
    })

    it('Error Invalid Token', (done) => {
        request(app)
            .get('/transactions/2')
            .set('token', token+2)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(401)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('message', 'Not Authenticated')
                    done()
                }
            })
    })

    it('Error Not Required Token', (done) => {
        request(app)
            .get('/transactions/2')
            .set('token', tokenAdmin)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(401)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('message', 'You must login first')
                    done()
                }
            })
    })

    it('Error Not Authorized', (done) => {
        request(app)
            .get('/transactions/3')
            .set('token', token)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(401)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('message', "That's not yours")
                    done()
                }
            })
    })

    it('Error Not Found', (done) => {
        request(app)
            .get('/transactions/2021')
            .set('token', token)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(404)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('message', "Data not found")
                    done()
                }
            })
    })

    it('Success', (done) => {
        request(app)
            .get('/transactions/2')
            .set('token', token)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(200)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('transactions')
                    done()
                }
            })
    })
})

describe('Read Transaction by Order ID', () => {
    it('Error No Token', (done) => {
        request(app)
            .get('/transactions/orderid/')
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(401)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('message', 'Not Authenticated')
                    done()
                }
            })
    })

    it('Error Invalid Token', (done) => {
        request(app)
            .get('/transactions/2')
            .set('token', token+2)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(401)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('message', 'Not Authenticated')
                    done()
                }
            })
    })

    it('Error Not Required Token', (done) => {
        request(app)
            .get('/transactions/2')
            .set('token', tokenAdmin)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(401)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('message', 'You must login first')
                    done()
                }
            })
    })

    it('Error Not Authorized', (done) => {
        request(app)
            .get('/transactions/3')
            .set('token', token)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(401)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('message', "That's not yours")
                    done()
                }
            })
    })

    it('Error Not Found', (done) => {
        request(app)
            .get('/transactions/2021')
            .set('token', token)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(404)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('message', "Data not found")
                    done()
                }
            })
    })

    it('Success', (done) => {
        request(app)
            .get('/transactions/2')
            .set('token', token)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(200)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('transactions')
                    done()
                }
            })
    })
})

