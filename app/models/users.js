const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
    first_name : {type : String},
    last_name : {type : String},
    username : {type : String  , lowercase : true},
    email : {type : String , lowercase : true},
    mobile : {type : String , required : true },
    role : {type : [String] , default : ['USER'] },
    password : {type : String },
    otp : {type : Object , default : {
        code : 0 ,
        expiresIn : 0 
    }},
    discount : {type : Number , default : 0 },
    bills : {type : Number , default : 0 },
    birthday : {type : String }
} , {
    timestamps : true,
    toJSON : {
        virtuals : true
    }
})

module.exports = {
    UserModel : mongoose.model("user" , Schema)
}