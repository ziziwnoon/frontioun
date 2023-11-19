const createHttpError = require("http-errors");
const { randomNumberGenerator } = require("../../../utils/functions");
const { authSchema } = require("../../validators/user/auth.schema");
const { UserModel } = require("./../../../models/users")
const Controller = require("../controller");
const {ROLES} = require("../../../utils/constants");

module.exports = new class AuthController extends Controller{
    async login(req , res , next){
        try {
            const user = await authSchema.validateAsync(req.body);
            const {mobile} = req.body;
            const code = randomNumberGenerator();
            return res.status(200).send("User is logged in successfuly")
        } catch (error) {
            next(createHttpError.BadRequest(error.message))
        }
    }

    async saveUser(mobile , code){
        const now = (new Date().getTime());
        const otp = {
            code , 
            expiresAt : now + 120000
        }
        const result = await this.checkExistingUser(mobile);
        if(result) {
            await updateUser(mobile , otp)
        }
        return !!(await UserModel.create({mobile , otp ,  role : [ROLES.USER] }));
    }

    async checkExistingUser(mobile){
        const user = await UserModel.findOne({mobile})
        return !!user;
    }

    async updateUser(mobile , dataObject = {}){
        Object.keys(dataObject).forEach( key => {
            if(["" , " " , 0 , null , NaN , "0" , undefined , "."].includes(dataObject[key])) delete dataObject[key]
        })

        const updatedResult = await UserModel.updateOne({mobile} , dataObject)
        return !!updatedResult.modifiedCount
    }
}