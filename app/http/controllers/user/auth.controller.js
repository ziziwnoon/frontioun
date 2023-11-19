const createHttpError = require("http-errors");
const { authSchema } = require("../../validators/user/auth.schema");
const Controller = require("../controller");

module.exports = new class AuthController extends Controller{
    async login(req , res , next){
        try {
            const user = await authSchema.validateAsync(req.body)
            return res.status(200).send("User is logged in successfuly")
        } catch (error) {
            next(createHttpError.BadRequest(error.message))
        }
    }
}