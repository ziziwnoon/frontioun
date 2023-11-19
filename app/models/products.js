const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
    title : {type : String , required : true} , 
    short_desc : {type : String , required : true} , 
    desc : {type : String , required : true} , 
    images : {type : [String] , required : true} , 
    category : {type : mongoose.Types.ObjectId , required : true} , 
    tags : {type : [String] , default : [] } ,
    comments : {type : [] , default : []} , 
    likes : {type : [mongoose.Types.ObjectId] , default : []} , 
    dislikes : {type : [mongoose.Types.ObjectId] , default : []} , 
    bookmark : {type : [mongoose.Types.ObjectId] , default : []} , 
    price : {type : Number , default : 0} , 
    discount : {type : Number , default : 0} , 
    count : {type : Number } , 
    type : {type : String , required:true} , 
    time : {type : String } , 
    format : {type : String } , 
    teacher : {type : mongoose.Types.ObjectId } , 
    feature : {type :Object , default : {
        length : "" ,
        height : "" , 
        weight : "" ,
        width : "" ,
        model : "" ,
        color : [] ,
        madein : ""
    } } , 
} , {
    timestamps : true
})

module.exports = {
    ProductModel : mongoose.model("product" , Schema)
}