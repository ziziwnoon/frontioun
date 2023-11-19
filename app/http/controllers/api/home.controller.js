const { authSchema } = require("../../validators/user/auth.schema");
const CreateHttpError = require('http-errors');
const Controller = require("../controller");
const createHttpError = require("http-errors");

module.exports = new class HomeController extends Controller{
    async indexPage(req , res , next){
        try {
            return res.status(200).send("This is index page of store")
        } catch (error) {
            next(createHttpError.BadRequest(error.message))
        }
    }
}