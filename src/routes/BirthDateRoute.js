const router = require('express').Router()
const AuthMiddleware = require('../middlewares/AuthMiddleware')

router.get('/bdate', AuthMiddleware, async (req, res) => {
    res.render('bdate', {
        title: "Birthday Date",
        error: ''
    })
})

router.post('/bdate', AuthMiddleware, async (req, res) => {
    try {

    } catch (e){

    }
})

module.exports = {
    path: '/signup',
    router: router
}