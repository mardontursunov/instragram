const router = require('express').Router();
const { createUser } = require('../models/UserModel')

router.get('/', (req, res) => {
    res.render('registration')
})

router.post('/', async (req, res) => {
    try {
        let {email, password} = req.body
        if (!(email && password)) throw new Error("Email or Password is not found")

        email = String(email)
        email = email.toLowerCase()

        await createUser(email, password)

        res.redirect('/signup')
    } catch (e) {
        res.render('registration', {
            error: e
        })
        console.log(e);
    }
})

module.exports = {
    path: '/signup',
    router: router
}