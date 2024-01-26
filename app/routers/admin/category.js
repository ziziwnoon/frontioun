const categoryController = require('../../http/controllers/admin/category.controller');

const router = require('express').Router();

/**
 * @swagger
 * /admin/category/all:
 *  get:
 *      summary: Get all categoris
 *      tags: [Category(Admin-Managment)]
 *      description: Get all categories
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

router.get("/all" , categoryController.getAllCategories);


/** 
 * @swagger
 * /admin/category/add:
 *  post:
 *      summary: Add category
 *      tags: [Category(Admin-Managment)]
 *      description: add category title and parent
 *      parameters:
 *          -   name: title
 *              description: title of category
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: parent
 *              description: Id of category parent
 *              required: false
 *              in: formData
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

router.post("/add" , categoryController.addCategory);



/**
 * @swagger
 * /admin/category/parents:
 *  get:
 *      summary: Get all parents
 *      tags: [Category(Admin-Managment)]
 *      description: Get all categories that have no parent
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

router.get("/parents" , categoryController.getAllParents);




/**
 * @swagger
 * /admin/category/{id}:
 *  get:
 *      summary: Get category by id
 *      tags: [Category(Admin-Managment)]
 *      description: Get category by id
 *      parameters:
 *          -   name: id
 *              description: id of category
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
router.get("/:id" , categoryController.getCategoryById);


/**
 * @swagger
 * /admin/category/children/{parent}:
 *  get:
 *      summary: Get Children of parent category
 *      tags: [Category(Admin-Managment)]
 *      description: Get Children of parent category
 *      parameters:
 *          -   name: parent
 *              description: id of parent category
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
router.get("/children/:parent" , categoryController.getAllChildrenOfParent);



/**
 * @swagger
 * /admin/category/edit/{id}:
 *  patch:
 *      summary: Edit category title
 *      tags: [Category(Admin-Managment)]
 *      description: Edit category title by id
 *      parameters:
 *          -   name: id
 *              description: id of category
 *              in: path
 *              required: true
 *              type: string
 *          -   name: title
 *              description: title of category
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
router.patch("/edit/:id" , categoryController.editCategoryTitle);



/**
 * @swagger
 * /admin/category/remove/{id}:
 *  delete:
 *      summary: Delete category
 *      tags: [Category(Admin-Managment)]
 *      description: delete category by id
 *      parameters:
 *          -   name: id
 *              description: id of category
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
router.delete("/remove/:id" , categoryController.removeCategory);







module.exports = {
    CategoryRoutes : router
}