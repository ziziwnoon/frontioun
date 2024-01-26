const { verifyAccessToken, checkRole } = require('../http/middlewares/verfy_access_token');
const { AdminRoutes } = require('./admin/admin');
const { HomeRoutes } = require('./api/home');
const { UserAuthRoutes } = require('./user/auth');
const { DeveloperRoutes } = require('./user/developer-routes');

const router = require('express').Router();

router.use("/admin" , verifyAccessToken , checkRole('ADMIN') , AdminRoutes);
router.use("/user" , UserAuthRoutes);
router.use("/developer" , DeveloperRoutes);
router.use("/" , verifyAccessToken , HomeRoutes);
module.exports = {
    AllRoutes : router
}