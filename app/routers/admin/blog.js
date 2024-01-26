const blogController = require('../../http/controllers/admin/blog.controller');
const { stringToArray } = require('../../http/middlewares/stringToArray');
const { fileUpload } = require('../../utils/multer');

const router =  require('express').Router()
/**
 * @swagger
 * /admin/blog/all:
 *  get:
 *      summary: Get all blogs
 *      tags: [Blog(Admin-Managment)]
 *      description: Get all blogs
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

router.get("/all" , blogController.BlogController.getAllBlogs);


/**
 * @swagger
 * /admin/blog/{id}:
 *  get:
 *      summary: Get blog by ID
 *      tags: [Blog(Admin-Managment)]
 *      description: Get blog by ID
 *      parameters:
 *          -   name: id
 *              description: id of blog
 *              in: path
 *              required: true
 *              type: string
 *      responses:
 *          200: 
 *              description: Success
 *          400:
 *              description: Bad Request
 *          401:
 *              description: Unauthorized
 *          500:
 *              description: Internal Server Error
 */

router.get("/:id" , blogController.BlogController.getBlogById);





/**
 * @swagger
 * /admin/blog/add:
 *  post:
 *      summary: Add Blog
 *      tags: [Blog(Admin-Managment)]
 *      description: add blog details
 *      consumes:
 *          -   multipart/form-data
 *          -   application/x-www-form-data-urlencoded
 *      parameters:
 *          -   name: title
 *              description: title of blog
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: short_text
 *              description: short text of blog
 *              required: true
 *              in: formData
 *              type: string
 *          -   name: text
 *              description:  text of blog
 *              required: true
 *              in: formData
 *              type: string
 *          -   name: category
 *              description: Id of blog category 
 *              required: true
 *              in: formData
 *              type: string
 *          -   name: tags
 *              description: tags of blog
 *              example: tag1#tag_2 OR tag1,tag_2
 *              required: true
 *              in: formData
 *              type: string
 *          -   name: image
 *              description: image of blog
 *              required: false
 *              in: formData
 *              type: file
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

router.post("/add" ,fileUpload.single('image') , stringToArray('tags') ,blogController.BlogController.addBlog);



/**
 * @swagger
 * /admin/blog/update/{id}:
 *  patch:
 *      summary: Edit Blog
 *      tags: [Blog(Admin-Managment)]
 *      description: edit blog details
 *      consumes:
 *          -   multipart/form-data
 *          -   application/x-www-form-data-urlencoded
 *      parameters:
 *          -   name: id
 *              description: title of blog
 *              in: path
 *              required: true
 *              type: string
 *          -   name: title
 *              description: title of blog
 *              in: formData
 *              type: string
 *          -   name: short_text
 *              description: short text of blog
 *              in: formData
 *              type: string
 *          -   name: text
 *              description:  text of blog
 *              in: formData
 *              type: string
 *          -   name: category
 *              description: Id of blog category 
 *              in: formData
 *              type: string
 *          -   name: tags
 *              description: tags of blog
 *              example: tag1#tag_2 OR tag1,tag_2
 *              in: formData
 *              type: string
 *          -   name: image
 *              description: image of blog
 *              in: formData
 *              type: file
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

router.post("/update/:id" ,fileUpload.single('image') , stringToArray('tags') ,blogController.BlogController.updateBlog);

module.exports = {
    BlogAdminApiRoutes : router
}