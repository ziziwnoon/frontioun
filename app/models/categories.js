const { default: mongoose, Schema } = require("mongoose");

const CategorySchema = new mongoose.Schema({
    title : {type : String , required : true} ,
    parent : {type : mongoose.Types.ObjectId , ref : "category" , default : undefined}
} , {
    timestamps : false ,
    id : false ,
    toJSON : {
        virtuals : true
    }
})

CategorySchema.virtual('children' , {
    ref : 'category' ,
    localField : '_id' ,
    foreignField : 'parent'
})

function autoPopulate(next){
    this.populate([{path : 'children' , select : {id : 0 , __v : 0}}])
    next()
}
CategorySchema.pre('findOne' ,autoPopulate).pre('find' ,autoPopulate)

module.exports = {
    CategoryModel : mongoose.model("category" , CategorySchema)
}