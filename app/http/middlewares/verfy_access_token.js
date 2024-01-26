const createHttpError = require('http-errors');
const JWT = require('jsonwebtoken');
const { UserModel } = require('../../models/users');
const { ACCESS_TOKEN_SECRET_KEY } = require('../../utils/constants');

function getToken(headers){
    const [bearer , token] = headers?.authorization?.split(" ") || [];
    if(token && ['bearer' , 'Bearer'].includes(bearer)) return token
    throw createHttpError.Unauthorized("لطفا وارد حساب کاربری خود شوید")
}

function verifyAccessToken(req , res , next){
    try {
        const token = getToken(req.headers)
        JWT.verify(token , ACCESS_TOKEN_SECRET_KEY , async (err , payload) => {
            try {
                if(err) throw(createHttpError.Unauthorized("لطفا وازد حساب کاربری خود شوید"));
                const {mobile} = payload || {};
                const user = await UserModel.findOne({mobile} , {password : 0 , otp : 0});
                if(!user) throw(createHttpError.NotFound("حساب کاربری یافت نشد!"))
                req.user = user;
                return next();
            } catch (error) {
                next(error)
            }
        })
    } catch (error) {
        next(error)
    }
}

function checkRole(role){
    try {
        return function(req, res , next){
            const user = req.user;
            if(user.role.includes(role)) return next()
            throw createHttpError.Forbidden("شما به این قسمت دسترسی ندارید")
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    verifyAccessToken ,
    checkRole
}