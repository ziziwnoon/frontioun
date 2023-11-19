const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
    first_name : {type : String},
    last_name : {type : String},
    username : {type : String  , lowercase : true},
    email : {type : String , lowercase : true},
    mobile : {type : String , required : true , unique : true },
    role : {type : [String] , default : ['USER'] },
    password : {type : String },
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