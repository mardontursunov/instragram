const router = require('express').Router()
const { findUser } = require('../models/UserModel')
const { LoginValidation } = require('../validations/LoginValidation')
const { checkCrypt } = require('../modules/bcrypt')
const { generateToken } = require('../modules/jwt')

router.get('/', (req, res) => {
    res.render('login', {
        title: 'Login'
    })
})

router.post('/', async (req, res) => {
    try {
        let body = await LoginValidation.validateAsync(req.body)
        let user;
        let phone_number = Number(body.login)
        if(isNaN(phone_number)){
            user = await findUser(body.login)
        } else {
            user = await findUser(phone_number)
        }
        if(!user)  throw new Error("The user is not found!")
        let isTrust = await checkCrypt(body.password, user.password)
        if(!isTrust){
            throw new Error("The password is incorrect!")
        }
        let token = generateToken({
            _id: user._id,
            name: user.name,
            username: user.username
        })

        res.cookie('token', token).redirect('/')
    }
    catch (e) {
        res.render('login', {
            title: "Login",
            error: e + ''
        })
    }
})

module.exports = {
    path: '/login',
    router: router
}