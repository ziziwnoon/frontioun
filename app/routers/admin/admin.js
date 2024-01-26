const { verifyAccessToken } = require('../../http/middlewares/verfy_access_token');
const { BlogAdminApiRoutes } = require('./blog');
const { CategoryRoutes } = require('./category');

const router = require('express').Router();
/**
 * @swagger
 * tags:
 *  -   name: Admin-Managment
 *      description: Routes of User Authentication
 *  -   name: Category(Admin-Managment)
 *      description: Routes of Category Management
 *  -   name: Blog(Admin-Managment)
 *      description: Routes of Blog Management
 */

router.use("/category"  , CategoryRoutes);
router.use("/blog" , BlogAdminApiRoutes);


module.exports = {
    AdminRoutes : router
}