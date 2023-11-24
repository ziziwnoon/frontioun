const { verifyAccessToken } = require('../http/middlewares/verfy_access_token');
const { HomeRoutes } = require('./api/home');
const { UserAuthRoutes } = require('./user/auth');
const { DeveloperRoutes } = require('./user/developer-routes');

const router = require('express').Router();

router.use("/user" , UserAuthRoutes);
router.use("/developer" , DeveloperRoutes);
router.use("/" , verifyAccessToken , HomeRoutes);
module.exports = {
    AllRoutes : router
}