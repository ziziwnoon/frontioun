const authController = require('../../http/controllers/user/auth.controller');

const router = require('express').Router();

router.post("/login" , authController.login);


module.exports = {
    UserAuthRoutes : router
}