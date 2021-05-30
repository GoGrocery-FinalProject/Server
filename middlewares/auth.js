const { verifyToken } = require('../helpers/jwt')
const { User, Transaction } = require('../models')

const authenticate = (req, res, next) => {
    let decoded = verifyToken(req.headers.token)
    User.findOne({
        where: { id: decoded.id, email: decoded.email }
    })
        .then(user => {
            req.currentUser = { id: user.id, email: user.email, isAdmin: user.isAdmin }
            next()
        })
        .catch(err => {
            next(err)
        })
}

const adminAuthorize = (req, res, next) => {
    if (req.currentUser.isAdmin !== true){
        next({
            code : 401,
            message : "Admin only",
        })
    } else {
        next()
    }
}

const customerAuthorize = (req, res, next) => {
    if (req.currentUser.isAdmin === false){
        next()
    } else {
        next({
            code : 401,
            message: "You must login first",
        })
    }
}

const transactionAuthorize = (req, res, next) => {
    Transaction.findOne({
        where: {
            id: Number(req.params.id)
        }
    })
        .then((data) => {
            if (data) {
                const valid = req.currentUser.id === data.UserId
                if (valid) {
                    next()
                } else {
                    next({
                        code: 401,
                        message: "That's not yours"
                    })
                }
            } else {
                next({
                    code: 404,
                    message: 'Data not found'
                })
            }
        })
        .catch((err) => {
            next(err)
        })
}

module.exports = {
    authenticate,
    adminAuthorize,
    customerAuthorize,
    transactionAuthorize
}