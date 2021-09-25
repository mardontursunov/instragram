const router = require('express').Router();
const AuthMiddleware = require('../middlewares/AuthMiddleware')
router.get('/', AuthMiddleware, (req, res) => {
    res.render('index', {
        title: "Home Page"
    })
})

module.exports = {
    path: '/',
    router: router
}