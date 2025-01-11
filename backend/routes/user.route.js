const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware.js");

router.post("/register",
    [
        body("email").isEmail().withMessage("invalid Email"),
        body("fullName.firstName").isLength({ min: 3 })
            .withMessage("firstName must be at least 3 chatrecter long"),
        body("password").isLength({ min: 6 })
            .withMessage("password must be at least 6 charecter long"),
    ],
    userController.registerUser
);

router.post("/login",
    [
        body("email").isEmail().withMessage("invalid Email"),
        body("password").isLength({ min: 6 })
            .withMessage("password must be at least 6 charecter long"),
    ],
    userController.loginUser
);

router.get("/logout", authMiddleware.authUser, userController.logoutUser);
router.get("/profile",authMiddleware.authUser, userController.userProfile);

module.exports = router;