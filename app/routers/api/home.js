const homeController = require('../../http/controllers/api/home.controller');
const router = require('express').Router();
/**
 * @swagger
 * tags:
 *  name: IndexPage
 *  description: Routes of index page
 */
/**
 * @swagger
 * /:
 *  get:
 *      summary: Index page
 *      tags: [IndexPage]
 *      description: Get all neccessary data of index page
 *      responses:
 *          200: 
 *              description: Success
 *          404:
 *              description: Not Found
 */
router.get("/" , homeController.indexPage);

module.exports = {
    HomeRoutes : router
}