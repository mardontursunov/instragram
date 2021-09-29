const { checkToken } = require('../lib/jwt')

module.exports = async function (req, res, next) {
    let token = req.cookies?.token
    token = checkToken(token)
    
    if(token) {
        req.user = token
    }
    next()
} 