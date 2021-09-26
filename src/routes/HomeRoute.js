const router = require('express').Router();
const UserMiddleware = require('../middlewares/AuthMiddleware')

router.use(UserMiddleware)
router.get('/', UserMiddleware, (req, res) => {
    res.render('index', {
        title: "Home Page"
    })
})

module.exports = {
    path: '/',
    router: router
}