const Joi = require('joi')

const LoginValidation = new Joi.object({
    login: Joi.string()
        .required()
        .alphanum()
        .error(new Error("Login is incorrect")),
    password: Joi.string()
        .required()
        .error(new Error("Password is incorrect"))
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})

module.exports = {
    LoginValidation
}