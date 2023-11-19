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
 * /user/login:
 *  post:
 *      summary: Login page
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
router.post("/login" , authController.login);


module.exports = {
    UserAuthRoutes : router
}