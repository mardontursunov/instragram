const router = require('express').Router()
const AuthMiddleware = require('../middlewares/AuthMiddleware')
const { BirthdayValidation } = require('../validations/BirthdayValidation')

router.get('/bdate', AuthMiddleware, async (req, res) => {
    res.render('bdate', {
        title: "Birthday Date",
        error: ''
    })
})

router.post('/bdate', AuthMiddleware, async (req, res) => {
    try {
        let body = await BirthdayValidation.validateAsync(req.body)
        
        let months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
        for(let item of months){
            if(item === body.bmonth){
                res.redirect('/signup/bdate')
            } else {
                throw new Error("Month is incorrect")
            }
        }
        
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