const router = require('express').Router();
const bcrypt = require('bcrypt');
const { randomNumberGenerator } = require('../../utils/functions');

/**
 * @swagger
 * tags:
 *  name: Developer-Routes
 *  description: Routes of Developer
 */


/**
 * @swagger
 * /developer/hash-password/{password}:
 *  get:
 *      summary: Hash password
 *      tags: [Developer-Routes]
 *      description: Hash any password
 *      parameters:
 *          -   name: password
 *              description: Password
 *              in: path
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


router.get("/hash-password/:password" , (req , res , next)=>{
    const {password} = req.params;
    const salt = bcrypt.genSaltSync(10);
    return res.send(bcrypt.hashSync(password , salt))
})




/**
 * @swagger
 * /developer/random-number/{min}/{max}:
 *  get:
 *      summary: Random number generator
 *      tags: [Developer-Routes]
 *      description: Generating random number
 *      parameters:
 *          -   name: min
 *              description: minimum range
 *              in: path
 *              required: true
 *              type: string
 *          -   name: max
 *              description: maximum range
 *              in: path
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


router.get("/random-number/:min/:max" , (req , res , next)=>{
    const {min , max} = req.params;
    return res.send(Math.floor(Math.random() * (max - min) + min).toString())
})


module.exports = {
    DeveloperRoutes : router
}