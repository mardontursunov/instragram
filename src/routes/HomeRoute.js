const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: "Instagram"
    })
})

module.exports = {
    path: '/',
    router: router
}