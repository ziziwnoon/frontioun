const createHttpError = require('http-errors');
const JWT = require('jsonwebtoken');
const { UserModel } = require('../models/users');
const { ACCESS_TOKEN_SECRET_KEY } = require('./constants');

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

module.exports = {
    randomNumberGenerator ,
    signAccessToken
}