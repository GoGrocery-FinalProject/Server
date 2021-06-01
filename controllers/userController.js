const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
    static register (req, res, next) {
        const {name, email, password, phone_number} = req.body
        User.create({
            name: name,
            email: email,
            password: password,
            phone_number: phone_number
        })
            .then((data) => {
                res.status(201).json({
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    phone_number: data.phone_number,
                    isAdmin: data.isAdmin
                })
            })
            .catch((err) => {
                next(err)
            })
    }

    static login (req, res, next) {
        const {email, password} = req.body
        User.findOne({
            where: {
                email: email
            }
        })
            .then((data) => {
                if (data) {
                    const valid = comparePassword(password, data.password)
                    if (valid) {
                        const token = generateToken({
                            id: data.id,
                            name: data.name,
                            email: data.email,
                            phone_number: data.phone_number
                        })
                        res.status(200).json({
                            userId: data.id,
                            name: data.name,
                            token: token,
                            isAdmin: data.isAdmin
                        })
                    } else {
                        next({
                            code: 403,
                            message: 'Invalid email/password'
                        })
                    }
                } else {
                    next({
                        code: 403,
                        message: 'Invalid email/password'
                    })
                }
            })
            .catch((err) => {
                next(err)
            })
    }

    static googleLogin (req, res, next) {
        const { email, name } = req.body
        User.findOne({
            where: {
                email: email
            }
        })
            .then((data) => {
                if (data) {
                    return data
                } else {
                    return User.create({
                        name: name,
                        email: email,
                        password: 'PASSWORD' + Math.floor((Math.random() * 1000000000)).toString(),
                        phone_number: '0812' + Math.floor((Math.random() * 1000000000)).toString()
                    })
                }
            })
            .then((data) => {
                const token = generateToken({
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    phone_number: data.phone_number
                })
                res.status(200).json({
                    token: token,
                    isAdmin: data.isAdmin
                })
            })
            .catch((err) => {
                next(err)
            })
    }
}

module.exports = UserController