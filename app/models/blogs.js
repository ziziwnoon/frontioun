const { default: mongoose } = require("mongoose");

const BlogSchema = new mongoose.Schema({
    author : {type : mongoose.Types.ObjectId , required : true} , 
    title : {type : String , required : true} , 
    text : {type : String , required : true} , 
    image : {type : String , required : true} , 
    category : {type : mongoose.Types.ObjectId , required : true} , 
    tags : {type : [String] , default : [] } ,
    comments : {type : [] , default : []} , 
    likes : {type : [mongoose.Types.ObjectId] , default : []} , 
    dislikes : {type : [mongoose.Types.ObjectId] , default : []} , 
    bookmark : {type : [mongoose.Types.ObjectId] , default : []} , 
} , {
    timestamps : true
})

module.exports = {
    BlogModel : mongoose.model("blog" , BlogSchema)
}