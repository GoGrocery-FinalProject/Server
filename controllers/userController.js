const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')

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
        const id_token = req.body.id_token
        const client = new OAuth2Client(process.env.GOOGLECLIENTID)
        console.log(id_token, process.env.GOOGLECLIENTID)
        let email
        let givenName
        let familyName
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLECLIENTID
        })
            .then((ticket) => {
                const payload = ticket.getPayload()
                email = payload.email
                givenName = payload.given_name
                familyName = payload.family_name
                return User.findOne({
                    where: {
                        email: email
                    }
                })
            })
            .then((data) => {
                if (data) {
                    return data
                } else {
                    return User.create({
                        name: givenName + familyName,
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