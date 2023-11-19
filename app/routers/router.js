const { HomeRoutes } = require('./api/home');
const { UserAuthRoutes } = require('./user/auth');

const router = require('express').Router();

router.use("/user" , UserAuthRoutes);
router.use("/" , HomeRoutes);
module.exports = {
    AllRoutes : router
}