const { Router } = require("express");
const userRouter = Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const { restrictTo } = require("../middlewares/checkForAuthentication");
const { isUserSchemaValidate } = require("../utils/schemasValidation");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads/");
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}_${file.originalname}`.replace(/ /g, '_');
        cb(null, filename)
    }
})

const upload = multer({ storage })


// Route : /api/users

userRouter
    .get("/verify", userController.verifyMail)
    .get("/logout", restrictTo(["USER", "ADMIN"]), userController.logout)
    .get("/signup", userController.signUpPage)
    .post("/signup", upload.single('profileImage'), isUserSchemaValidate, userController.signup)
    .get("/signin", userController.signInPage)
    .post("/signin", userController.signIn)
    .get("/resetPassword", userController.resetPasswordPage)
    .post("/resetPassword", userController.resetPassword)
    .get("/changePassword", userController.changePassword)
    .post("/changePassword", userController.setNewPassword)

module.exports = userRouter;
