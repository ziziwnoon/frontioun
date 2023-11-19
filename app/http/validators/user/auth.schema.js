const Joi = require('@hapi/joi');

const authSchema = Joi.object({
    email : Joi.string().lowercase().trim().email().required() ,
    password : Joi.string().min(6).max(12).trim().required() ,
})

module.exports = {
    authSchema
}