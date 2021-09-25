const router = require('express').Router()

router.get('/', async (req, res) => {
    res.render('bdate', {
        title: "Birthday Date",
        error: ''
    })
})

router.post('/', async (req, res) => {
    try {

    } catch (e){

    }
})

module.exports = {
    path: '/bdate',
    router: router
}