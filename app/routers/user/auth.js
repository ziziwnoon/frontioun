const authController = require('../../http/controllers/user/auth.controller');

const router = require('express').Router();
/**
 * @swagger
 * tags:
 *  name: User-Authentication
 *  description: Routes of User Authentication
 */
/**
 * @swagger
 * /user/get-otp:
 *  post:
 *      summary: Get OTP page
 *      tags: [User-Authentication]
 *      description: OTP Login with phone number
 *      parameters:
 *          -   name: mobile
 *              description: FA-IRI phone number
 *              in: formData
 *              required: true
 *              type: string
 *      responses:
 *          201: 
 *              description: Success
 *          400:
 *              description: Bad Request
 *          401:
 *              description: Unauthorized
 *          500:
 *              description: Internal Server Error
 */
router.post("/get-otp" , authController.getOtp);


/**
 * @swagger
 * /user/check-otp:
 *  post:
 *      summary: Check OTP 
 *      tags: [User-Authentication]
 *      description: Checking entered OTP Login
 *      parameters:
 *          -   name: mobile
 *              description: FA-IRI phone number
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: code
 *              description: otp code
 *              in: formData
 *              required: true
 *              type: string
 *      responses:
 *          201: 
 *              description: Success
 *          400:
 *              description: Bad Request
 *          401:
 *              description: Unauthorized
 *          500:
 *              description: Internal Server Error
 */
 router.post("/check-otp" , authController.checkOtp);

module.exports = {
    UserAuthRoutes : router
}