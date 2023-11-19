const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
    title : {type : String} , 
    text : {type : String } , 
    image : {type : String , required : true} ,
    type : {type : String , default : "main" } , 
} , {
    timestamps : true
})

module.exports = {
    SliderModel : mongoose.model("slider" , Schema)
}