const router = require('express').Router();
const { createUser } = require('../models/UserModel')
const { SignupValidation } = require('../validations/SignupValidation')
const { generateCrypt } = require('../modules/bcrypt')
const { generateToken } = require('../modules/jwt')

router.get('/', (req, res) => {
    res.render('registration')
})

router.post('/', async (req, res) => {
    try {
        const { phone, name, username, password } = await SignupValidation.validateAsync(req.body)
        let user = await createUser(phone, name, username, generateCrypt(password) )

        let token = generateToken({
            _id: user._id,
            name: user.name,
            username: user.username
        })

        res.cookie('token', token).redirect('/signup')

    } catch(e) {
        if(String(e).includes("duplicate key")){
            e = "Phone or Username is already exists!"
        }
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