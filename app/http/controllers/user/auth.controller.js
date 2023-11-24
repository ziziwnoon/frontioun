const createHttpError = require("http-errors");
const { randomNumberGenerator, signAccessToken, verifyRefreshToken, signRefreshToken } = require("../../../utils/functions");
const { authSchema, getOtpSchema, checkOtpSchema } = require("../../validators/user/auth.schema");
const { UserModel } = require("./../../../models/users")
const Controller = require("../controller");
const { ROLES } = require("../../../utils/constants");

module.exports = new class AuthController extends Controller{
    async getOtp(req , res , next){
        try {
            await getOtpSchema.validateAsync(req.body);
            const {mobile} = req.body;
            const code = randomNumberGenerator();
            const result = await this.saveUser(mobile , code);
            if(!result) throw createHttpError.Unauthorized("اعتبار سنجی انجام نشد")
            return res.status(200).send({
                data : {
                    statusCode : 200 ,
                    message : "کد با موفقیت برای تلفن شما ارسال شد" ,
                    code ,
                    mobile
                }
            })
        } catch (error) {
            next(createHttpError.BadRequest(error.message))
        }
    }

    async checkOtp(req, res , next){
        try {
            await checkOtpSchema.validateAsync(req.body);
            const {mobile , code} = req.body;
            const user = await UserModel.findOne({mobile});
            if(!user) throw createHttpError.Unauthorized("اطلاعات وارد شده صحیح نمیباشد")
            if(user.otp.code != code ) throw createHttpError.Unauthorized("کد وارد شده اشتباه است")
            const now = Date.now();
            if(+user.otp.expiresIn < now) throw createHttpError.Unauthorized("کد وارد شده منقضی شده است");
            const accessToken = await signAccessToken(user._id);
            const refreshToken = await signRefreshToken(user._id);
            return res.json({
                data : {
                    accessToken,
                    refreshToken
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async refreshToken(req , res, next){
        try {
            const {refreshToken} = req.body;
            const mobile = await verifyRefreshToken(refreshToken);
            const user = await UserModel.findOne({mobile});
            const accessToken = await signAccessToken(user._id);
            const newRefreshToken =  await signRefreshToken(user._id);
            return res.json({
                data : {
                    accessToken ,
                    refreshToken : newRefreshToken
                }
            })
        } catch (error) {
            next(error);
        }
    }



    async saveUser(mobile , code){
        const now = (new Date().getTime());
        let otp = {
            code , 
            expiresIn : now + 120000
        }
        const result = await this.checkExistingUser(mobile);
        if(result) {
            await this.updateUser(mobile , {otp})
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