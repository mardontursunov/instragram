const router = require('express').Router();
const UserMiddleware = require('../middlewares/UserMiddleware')
const upload = require('express-fileupload')

router.get('/', UserMiddleware, (req, res) => {
    res.render('index', {
        title: "Home Page"
    })
})

router.post('/upload', upload({ size: (1024 * 10) * 1024
 }), (req, res) => {

})

module.exports = {
    path: '/',
    router: router
}