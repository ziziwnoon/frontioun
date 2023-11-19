const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
    first_name : {type : String},
    last_name : {type : String},
    username : {type : String , required : true , unique : true , lowercase : true},
    email : {type : String , required : true , unique : true , lowercase : true},
    role : {type : [String] , default : ['USER'] },
    password : {type : String , required : true},
    otp : {type : Object , default : {
        code : 0 ,
        expiresAt : 0 
    }},
    discount : {type : Number , default : 0 },
    birthday : {type : String }
} , {
    timestamps : true
})

module.exports = {
    UserModel : mongoose.model("user" , Schema)
}