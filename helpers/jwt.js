const jwt = require('jsonwebtoken')

const generateToken = (payload) => jwt.sign(payload, "secret")
const verifyToken = (token) => jwt.verify(token, "secret")

module.exports = {
    generateToken,
    verifyToken
}