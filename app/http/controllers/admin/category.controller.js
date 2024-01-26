const createHttpError = require("http-errors");
const { CategoryModel } = require("../../../models/categories");
const { addCategorySchema, editCategorySchema } = require("../../validators/admin/category.schema");
const Controller = require("../controller");
module.exports = new class CategoryController extends Controller {
    async addCategory(req , res , next){
        try {
            await addCategorySchema.validateAsync(req.body)
            const {title , parent} = req.body;
            const createdCategory = await CategoryModel.create({title , parent});
            if(!createdCategory) throw createHttpError.InternalServerError("خطای داخلی سرور");
            return res.status(201).json({
                statusCode : 201 ,
                data : {
                    message : "دسته بندی با موفقیت افزوده شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async editCategoryTitle(req , res , next){
        try {
            const {id} = req.params;
            const {title} = req.body;
            await this.checkExistingCategory(id);
            await editCategorySchema.validateAsync(req.body);
            const resultOfUpdatedCategory = await CategoryModel.updateOne({_id : id} , {$set : {title}})
            if(resultOfUpdatedCategory.modifiedCount == 0) throw createHttpError.InternalServerError("بروزرسانی انجام نشد")
            return res.status(200).json({
                statusCode : 200 ,
                data : {
                    message : "بروزرسانی با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }



    async removeCategory(req , res , next){
        try {
            const {id} = req.params;
            const category = await this.checkExistingCategory(id);
            const deletedCategory = await CategoryModel.deleteOne({_id : category._id})
            if(deletedCategory.deletedCount == 0) throw createHttpError.InternalServerError("دسته بندی حذف نشد")
            return res.status(200).json({
                statusCode : 200 ,
                data : {
                    message : "دسته بندی با موفقیت حذف شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllCategories(req , res , next){
        try {

            // const categories = await CategoryModel.aggregate([
            //     {
            //         $lookup : {
            //             from : 'categories' ,
            //             localField : '_id' ,
            //             foreignField : 'parent' ,
            //             as : 'children'
            //         }
            //     },
            //     {
            //         $project : {
            //             __v : 0 ,
            //             'children.parent' : 0 ,
            //             'children.__v' : 0
            //         }
            //     }
            // ])

            const categories = await CategoryModel.find({parent : undefined} )
            return res.status(200).json({
                statusCode : 200 ,
                data : {
                    categories
                }
            })
            
        } catch (error) {
            next(error)
        }
    }
    async getCategoryById(req , res , next){
        try {
            const {id} = req.params;
            const category = await this.checkExistingCategory(id);
            return res.status(200).json({
                statusCode : 200 ,
                data : {
                    category
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllParents(req , res , next){
        try {
            const parents = await CategoryModel.find({parent : undefined} , {title : 1 , _id : 1})
            if(!parents) throw createHttpError.NotFound("دسته بندی یافت نشد")
            return res.status(200).json({
                statusCode : 200 ,
                data : {
                    parents
                }
            })
            
        } catch (error) {
            next(error)
        }
    }
    async getAllChildrenOfParent(req , res , next){
        try {
            const {parent} = req.params;
            const children = await CategoryModel.find({parent} , {id : 1 , title : 1})
            if(!children) throw createHttpError.NotFound("این دسته بندی هیچ فرزندی ندارد")
            return res.status(200).json({
                statusCode : 200 ,
                data : {
                    children
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async checkExistingCategory(id){
        const category = await CategoryModel.findById(id)
        if(!category) throw createHttpError.NotFound("دسته بندی یافت نشد")
        return category
    }
}