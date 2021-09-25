const router = require('express').Router();
const { createUser } = require('../models/UserModel')
const { SignupValidation } = require('../validations/SignupValidation')

router.get('/', (req, res) => {
    res.render('registration')
})

router.post('/', async (req, res) => {
    try {
        const body = await SignupValidation.validateAsync(req.body)
        console.log(body);

    } catch(e) {
        res.render('registration', {
            title: "Sign Up",
            error: e
        })
    }
})

module.exports = {
    path: '/signup',
    router: router
}