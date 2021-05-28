const bcrypt = require('bcrypt')

function hashPassword(plainPassword) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(plainPassword, salt)

    return hash
}

function comparePassword(inputPassword, hashedPassword) {
    const compare = bcrypt.compareSync(inputPassword, hashedPassword)

    return compare
}

module.exports = { hashPassword, comparePassword }