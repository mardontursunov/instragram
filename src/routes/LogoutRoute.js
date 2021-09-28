const router = require('express').Router();

router.get('/', (req, res) => {
    res.clearCookie('token').redirect('/login')
})

module.exports = {
    path: '/logout',
    router: router
}