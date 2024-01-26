const createHttpError = require("http-errors");
const { BlogModel } = require("../../../models/blogs");
const Controller = require("../controller");
const { addBlogSchema } = require("../../validators/admin/blog.schema");
const path = require('path');
const { deleteFileInPublic } = require("../../../utils/functions");

class BlogController extends Controller{
    async getAllBlogs(req , res ,next){
        try {
            const blogs = await BlogModel.aggregate([
                {$match : {}} ,
                {
                    $lookup : {
                        from : "users" ,
                        localField : "author" ,
                        foreignField : "_id" ,
                        as : "author"
                    }
                } ,
                {
                    $unwind : "$author"
                } ,
                {
                    $lookup : {
                        from : "categories" ,
                        localField : "category" ,
                        foreignField : "_id" ,
                        as : "category"
                    }
                } ,
                {
                    $unwind : "$author"
                } ,
                {
                    $project : {
                        "author.role" : 0 ,
                        "author.password" : 0 ,
                        "author.otp" : 0 ,
                        "author.discount" : 0 ,
                        "author.bills" : 0 ,
                        "author.birthday" : 0 ,
                        "author.__v" : 0 ,
                        "category.__v" : 0 ,
                    }
                }
            ])
            if(!blogs) throw createHttpError.NotFound("هیچ بلاگی یافت نشد!")
            return res.status(200).json({
                statusCode : 200 ,
                data : {
                    blogs
                }
            })
        } catch (error) {
            next(error)
        }
    }


    async getBlogById(req, res , next){
        try {
            const {id} = req.params
            const blog = await this.findBlog({_id : id})
            return res.status(200).json({
                statusCode : 200 ,
                data : {
                    blog
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async addBlog(req , res, next){
        try {
            const blogDetails = await addBlogSchema.validateAsync(req.body);
            const author = req.user._id
            req.body.image = path.join(blogDetails.fileUploadPath , blogDetails.filename)
            const image = req.body.image
            const {title , short_text , text , category , tags } = blogDetails
            const createdBlog = await BlogModel.create({title , short_text , text , category , tags , author , image})
            return res.status(201).json({
                statusCode : 201 ,
                data : {
                    message : "ایجاد بلاگ با موفقیت انجام شد"
                }
            })
        } catch (error) {
            deleteFileInPublic(req.body.image)
            next(error)
        }
    }

    async updateBlog(req, res, next){
        try {
            const {id} = req.params
            if(req?.body?.fileUploadPath && req?.body?.filename){
                req.body.image = path.join(blogDetails.fileUploadPath , blogDetails.filename)
            }
            const data = req.body;
            const nullishData = ["" , " " , 0 , null , undefined]
            const fieldsBlackList = ["author" , "bookmarks" , "likes" , "dislikes" , "comments"]
            Object.keys(data).forEach(key => {
                if(fieldsBlackList.includes(key)) delete data[key]
                if(typeof data[key] == "string") data[key] = data[key].trim()
                if(Array.isArray(data[key]) && Array.length > 0) data[key] = data[key].map(item => item.trim())
                if(nullishData.includes(data[key])) delete data[key]
            })

            const updatedResult = await BlogModel.updateOne({_id : id} , {$set : data})
            if(updatedResult.modifiedCount == 0) throw createHttpError.InternalServerError("بروزرسانی بلاگ انجام نشد")
            
        } catch (error) {
            next(error)
        }
    }

    async deleteBlogById(req , res, next) {
        try {
            const {id} = req.params
            await this.findBlog({_id : id})
            const result = await BlogModel.deleteOne({_id : id})
            if(result.deletedCount == 0) throw createHttpError.InternalServerError("حذف انجام نشد")
            return res.status(200).json({
                statusCode : 200 ,
                data : {
                    message : "حذف بلاگ با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async findBlog(query = {}){
        const blog = await BlogModel.findOne(query)
        .populate([{path : category , select : ['title']} , {path : author , select : ['mobile' , 'first_name' , "last_name" , "username"]}])
        if(!blog) throw createHttpError.NotFound("بلاگی یافت نشد")
        return blog
    }
}

module.exports = {
    BlogController : new BlogController()
}