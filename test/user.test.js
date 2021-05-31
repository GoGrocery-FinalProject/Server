const request = require('supertest')
const app = require('../app')
const { Op } = require('sequelize')
const { User } = require('../models')

describe('Testing Register', () => {
    it('Error No Name', (done) => {
        const body = {
            name: '',
            email: 'sistazroel@mail.com',
            password: 'zroelzroelzroel',
            phone_number: '081908910918'
        }
        request(app)
            .post('/register')
            .send(body)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('message', 'Name cannot be empty')
                    done()
                }
            })
    })

    it('Error No Email', (done) => {
        const body = {
            name: 'binazroel',
            email: '',
            password: 'zroelzroelzroel',
            phone_number: '081908910918'
        }
        request(app)
            .post('/register')
            .send(body)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('message', 'Email is required')
                    done()
                }
            })
    })

    it('Error No Phone Number', (done) => {
        const body = {
            name: 'binazroel',
            email: 'sistazroel@mail.com',
            password: 'zroelzroelzroel',
            phone_number: ''
        }
        request(app)
            .post('/register')
            .send(body)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('message', 'Phone Number is required')
                    done()
                }
            })
    })

    it('Error No Password', (done) => {
        const body = {
            name: 'binazroel',
            email: 'sistazroel@mail.com',
            password: '',
            phone_number: '081908910918'
        }
        request(app)
            .post('/register')
            .send(body)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('message', 'Password is required')
                    done()
                }
            })
    })

    it('Error Not E-Mail', (done) => {
        const body = {
            name: 'binazroel',
            email: 'sistazroelmail',
            password: 'zroelzroelzroel',
            phone_number: '081908910918'
        }
        request(app)
            .post('/register')
            .send(body)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('message', 'Invalid email format')
                    done()
                }
            })
    })

    it('Success', (done) => {
        const body = {
            name: 'binazroel',
            email: 'sistazroel@mail.com',
            password: 'zroelzroelzroel',
            phone_number: '081908910918'
        }
        request(app)
            .post('/register')
            .send(body)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(201)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('id')
                    expect(typeof res.body.id).toEqual('number')
                    expect(res.body).toHaveProperty('name', body.name)
                    expect(res.body).toHaveProperty('email', body.email)
                    expect(res.body).toHaveProperty('phone_number', body.phone_number)
                    expect(res.body).toHaveProperty('isAdmin', false)
                    done()
                }
            })
    })

    it('Not Unique E-Mail', (done) => {
        const body = {
            name: 'binazroel',
            email: 'sistazroel@mail.com',
            password: 'zroelzroelzroel',
            phone_number: '081908910918'
        }
        request(app)
            .post('/register')
            .send(body)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('message', 'email must be unique')
                    done()
                }
            })
    })
})

describe('Testing Login', () => {
    it('Error No E-mail', (done) => {
        const body = {
            email: '',
            password: 'zroelzroelzroel'
        }
        request(app)
            .post('/login')
            .send(body)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(403)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('message', 'Invalid email/password')
                    done()
                }
            })
    })

    it('Error No Password', (done) => {
        const body = {
            email: 'sistazroel@mail.com',
            password: ''
        }
        request(app)
            .post('/login')
            .send(body)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(403)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('message', 'Invalid email/password')
                    done()
                }
            })
    })

    it('Success', (done) => {
        const body = {
            email: 'sistazroel@mail.com',
            password: 'zroelzroelzroel'
        }
        request(app)
            .post('/login')
            .send(body)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(200)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('token')
                    expect(typeof res.body.token).toEqual('string')
                    expect(res.body).toHaveProperty('isAdmin')
                    done()
                }
            })
    })

    afterAll(() => {
        User.destroy({
            where: {
                [Op.not]: [
                    {id: [1, 2, 3]}
                ]
            }
        })
    })
})