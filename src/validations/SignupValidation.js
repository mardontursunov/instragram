const Joi = require('joi');

const SignupValidation = new Joi.object({
    phone: Joi.number()
        .min(10000)
        .max(99999999999999999)
        .error(new Error("Phone number is incorrect"))
        .required(),
    name: Joi.string()
        .min(2)
        .max(32)
        .error(new Error("Full name is incorrect"))
        .required(),
    username: Joi.string()
        .min(6)
        .max(16)
        .alphanum()
        .error(new Error("Username is incorrect"))
        .required(),
    password: Joi.string()
        .min(8)
        .max(32)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .error(new Error("Password is incorrect"))
        .required()
})

module.exports = {
    SignupValidation
}