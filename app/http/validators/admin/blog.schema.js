const createHttpError = require("http-errors")
const { MongoIDPattern } = require("../../../utils/constants")
const Joi = require("@hapi/joi")

const addBlogSchema = Joi.object({
    title : Joi.string().min(3).max(15).error(createHttpError.BadRequest("عنوان بلاگ وارد شده صحیح نمیباشد")),
    short_text : Joi.string().error(createHttpError.BadRequest("متن کوتاه بلاگ وارد شده صحیح نمیباشد")),
    text : Joi.string().error(createHttpError.BadRequest("متن کوتاه بلاگ وارد شده صحیح نمیباشد")),
    tags : Joi.array().min(0).max(20).error(createHttpError.BadRequest("تگ بلاگ وارد شده صحیح نمیباشد")),
    filename : Joi.string().regex(/(\.png|\.jpg|\.jpeg|\.gif|\.webp)$/).error(createHttpError.BadRequest("تصویر بلاگ وارد شده صحیح نمیباشد")),
    category : Joi.string().pattern(MongoIDPattern).error(createHttpError.BadRequest("شناسه دسته بندی وارد شده صحیح نمیباشد")),
    fileUploadPath : Joi.allow()
})


module.exports = {
    addBlogSchema
}