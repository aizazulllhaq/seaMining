const { Router } = require("express");
const userRouter = Router();
const userController = require('../controllers/usercontroller');


userRouter
    .post("/signup", userController.signUp)
    .post("/login", userController.login)
    .post("/resetPassword", userController.resetPassword)
    .get("/logout", userController.logout);


module.exports = userRouter;