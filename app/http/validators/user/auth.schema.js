const Joi = require('@hapi/joi');
const createHttpError = require('http-errors');

const authSchema = Joi.object({
    mobile : Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(createHttpError.BadRequest("موبایل وارد شده صحیح نمیباشد")),
})

module.exports = {
    authSchema
}