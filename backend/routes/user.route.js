const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");
const { body } = require("express-validator");

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

router.post("/login", userController.loginUser);
router.get("/logout", userController.logoutUser);
router.get("/profile", userController.profileUser);

module.exports = router;