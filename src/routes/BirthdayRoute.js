const router = require('express').Router()
const AuthMiddleware = require('../middlewares/AuthMiddleware')
const { BirthdayValidation } = require('../validations/BirthdayValidation')
const { updateDate } = require('../models/UserModel')

router.use(AuthMiddleware)
router.use(async (req, res, next) => {
    if(req.user){
        res.redirect('/')
        return 0
    }
    next()
})

router.get('/bdate', AuthMiddleware, async (req, res) => {
    res.render('bdate', {
        title: "Birthday Date",
        error: ''
    })
})

router.post('/bdate', AuthMiddleware, async (req, res) => {
    try {
        let body = await BirthdayValidation.validateAsync(req.body)
        let updatedDate = await updateDate(req.user?._id, body)
        res.redirect('/')
    } catch (e){
        res.render('bdate', {
            title: "Birthday Page",
            error: e + ''
        })
    }
})

module.exports = {
    path: '/signup',
    router: router
}