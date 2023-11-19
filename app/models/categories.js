const { default: mongoose } = require("mongoose");

const CategorySchema = new mongoose.Schema({
    title : {type : String , required : true} ,
} , {
    timestamps : true
})

module.exports = {
    CategoryModel : mongoose.model("category" , CategorySchema)
}