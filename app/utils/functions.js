const createHttpError = require('http-errors');
const JWT = require('jsonwebtoken');
const { UserModel } = require('../models/users');
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require('./constants');
const redisClient = require('./init-redis');
const fs = require('fs')
const path = require('path')

function randomNumberGenerator(){
    return Math.floor((Math.random() * 90000) + 10000)
}

function signAccessToken(userId ){
    return new Promise(async (resolve , reject) => {
        const user = await UserModel.findById(userId);
        const payload = {
            mobile : user.mobile 
        }
        const options = {
            expiresIn : "1h"
        }

        JWT.sign(payload , ACCESS_TOKEN_SECRET_KEY , options , (err , token) => {
            if(err) reject(createHttpError.InternalServerError("خطای سرور"));
            resolve(token);
        })
    })
}

function signRefreshToken(userId ){
    return new Promise(async (resolve , reject) => {
        const user = await UserModel.findById(userId);
        const payload = {
            mobile : user.mobile 
        }
        const options = {
            expiresIn : "1y"
        }
        JWT.sign(payload , REFRESH_TOKEN_SECRET_KEY , options , async(err , token) => {
            if(err) reject(createHttpError.InternalServerError("خطای سرور"));
            await redisClient.SETEX(String(userId) , 365*24*60*60 , token);
            resolve(token);
        })
    })
}


function verifyRefreshToken(token ){
    return new Promise((resolve , reject) => {
        JWT.verify(token , REFRESH_TOKEN_SECRET_KEY , async (err , payload) => {
            if(err) reject(createHttpError.Unauthorized("لطفا وازد حساب کاربری خود شوید"));
            const {mobile} = payload || {};
            const user = await UserModel.findOne({mobile} , {password : 0 , otp : 0});
            if(!user) return reject(createHttpError.NotFound("حساب کاربری یافت نشد!"))
            const refreshToken = await redisClient.v4.get(String(user?._id) || "key_default")
            if(!refreshToken) reject(createHttpError.Unauthorized("اعتبار سنجی انجام نشد مجددا وارد حساب خود شوید"))
            if(token == refreshToken) return resolve(mobile);
            reject(createHttpError.Unauthorized("اعتبار سنجی انجام نشد مجددا وارد حساب خود شوید"))
        })
    })   
}


function deleteFileInPublic(fileAddress){
    if(fileAddress){
        const filePath = path.join(__dirname , ".." , ".." , "public" , fileAddress)
        if(fs.existsSync(filePath)) fs.unlinkSync(filePath)
    }
}

module.exports = {
    randomNumberGenerator ,
    signAccessToken,
    verifyRefreshToken,
    signRefreshToken,
    deleteFileInPublic
}