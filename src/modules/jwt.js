const JWT = require('jsonwebtoken')

require('dotenv').config()

function generateToken(data) {
    return JWT.sign(data, process.env.SECRET_WORD)
}

function checkToken (token) {
    try {   
        return JWT.verify(token, process.env.SECRET_WORD)
    } catch (e) {
        return false
    }
}

module.exports = {
    generateToken,
    checkToken
}