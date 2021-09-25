const JWT = require('jsonwebtoken')
const path = require('path')

require('dotenv').config()

function generateToken(data) {
    return JWT.sign(data, process.env.SECRET_WORD)
}

function checkToken (token) {
    try {   
        return JWT.verify(token, process.env.SECRET_WORD)
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    generateToken,
    checkToken
}