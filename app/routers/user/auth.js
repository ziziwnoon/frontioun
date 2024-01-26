const authController = require('../../http/controllers/user/auth.controller');

const router = require('express').Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          GetOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: the user's mobile for sign up or sign in
 *          CheckOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *                  -   code
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: the user's mobile for sign up or sign in
 *                  code:
 *                      type: integer
 *                      description: the user's code for getting access token
 *          RefreshToken:
 *              type: object
 *              required:
 *                  -   refreshToken
 *              properties:
 *                  refreshToken:
 *                      type: string
 *                      description: the user's refresh token for getting a new refresh token
 */

/**
 * @swagger
 * tags:
 *  name: User-Authentication
 *  description: Routes of User Authentication
 */
/** 
 * @swagger
 * /user/get-otp/{mobile}:
 *  post:
 *      summary: Add category
 *      tags: [User-Authentication]
 *      description: add category title and parent
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/GetOTP"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/GetOTP"
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
router.post("/get-otp/:mobile" , authController.getOtp);


/**
 * @swagger
 * /user/check-otp/{mobile}/{code}:
 *  post:
 *      summary: Check OTP 
 *      tags: [User-Authentication]
 *      description: Checking entered OTP Login
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/CheckOTP"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/CheckOTP"
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
 router.post("/check-otp/:mobile/:code" , authController.checkOtp);

/**
 * @swagger
 * /user/refresh-token:
 *  post:
 *      summary: get refresh token
 *      tags: [User-Authentication]
 *      description: new refresh token
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/RefreshToken"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/RefreshToken"
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
 router.post("/refresh-token" , authController.refreshToken);

module.exports = {
    UserAuthRoutes : router
}