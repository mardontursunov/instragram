const Joi = require('joi');

const BirthdayValidation = new Joi.object({
    bmonth: Joi.string()
        .required()
        .error(new Error("Month is incorrect"))
        .trim(),
    bday: Joi.number()
        .required()
        .error(new Error("Day is incorrect"))
        .min(1)
        .max(31),
    byear: Joi.number()
        .required()
        .error(new Error("Year is incorrect"))
        .min(1930)
        .max(2017)
})

module.exports = {
    BirthdayValidation
}