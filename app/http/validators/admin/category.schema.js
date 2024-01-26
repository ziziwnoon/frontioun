const Joi = require('@hapi/joi');
const createHttpError = require('http-errors');
const { MongoIDPattern } = require('../../../utils/constants');

const addCategorySchema = Joi.object({
    title : Joi.string().min(3).max(15).error(createHttpError.BadRequest("عنوان دسته بندی وارد شده صحیح نمیباشد")),
    parent : Joi.string().allow("").pattern(MongoIDPattern).allow("").error(createHttpError.BadRequest("شناسه وارد شده صحیح نمیباشد"))
})

const editCategorySchema = Joi.object({
    title : Joi.string().min(3).max(15).error(createHttpError.BadRequest("عنوان دسته بندی وارد شده صحیح نمیباشد")),
})

module.exports = {
    addCategorySchema ,
    editCategorySchema
}