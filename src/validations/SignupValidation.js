const Joi = require('joi');

const SignupValidation = new Joi.object({
    phone: Joi.number()
        .min(10000)
        .max(99999999999999999)
        .required(),
    name: Joi.string()
        .min(2)
        .max(32)
        .required(),
    username: Joi.string()
        .min(6)
        .max(16)
        .alphanum()
        .required(),
    password: Joi.string()
        .min(8)
        .max(32)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()
})

module.exports = {
    SignupValidation
}