const { checkToken } = require('../lib/jwt')

module.exports = async function (req, res, next) {
    let token = req.cookies?.token
    token = checkToken(token)

    if(!token){
        res.redirect('/login')
        return 0
    } else {
        req.user = token
    }
    next()
}