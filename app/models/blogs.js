const { default: mongoose } = require("mongoose");
const commentSchema = new mongoose.Schema({
    user : {type : mongoose.Types.ObjectId , ref : 'users'},
    comment : {type : String , required : true} , 
    createdAt : {type : Date , default : new Date().getTime()},
    parent : {type : mongoose.Types.ObjectId }
})
const BlogSchema = new mongoose.Schema({
    author : {type : mongoose.Types.ObjectId , ref : "user" ,required : true} , 
    title : {type : String , required : true} , 
    short_text : {type : String , required : true} , 
    text : {type : String , required : true} , 
    image : {type : String , required : true} , 
    category : {type : [mongoose.Types.ObjectId] , ref : "category" , required : true} , 
    tags : {type : [String] , default : [] } ,
    comments : {type : [commentSchema] , default : []} , 
    likes : {type : [mongoose.Types.ObjectId] ,ref : 'users' , default : []} , 
    dislikes : {type : [mongoose.Types.ObjectId] ,ref : 'user' , default : []} , 
    bookmarks : {type : [mongoose.Types.ObjectId] ,ref : 'user' , default : []} , 
} , {
    timestamps : true ,
    versionKey : false ,
    toJSON : {
        virtuals : true
    }
})

BlogSchema.virtual('category_details' , {
    ref : 'category' ,
    localField : '_id' ,
    foreignField : 'category'
})

BlogSchema.virtual('user' , {
    ref : 'user' ,
    localField : '_id' ,
    foreignField : 'author'
})
module.exports = {
    BlogModel : mongoose.model("blog" , BlogSchema)
}