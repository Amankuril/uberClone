const express = require("express");
const router = express.Router();
const captainController = require("../controllers/captain.controller.js");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware.js");

router.post("/captainRegister",
    [
        body("email").isEmail().withMessage("invalid email"),
        body("password").isLength({ min: 6 })
            .withMessage("password must be atleast 6 character long"),
        body("fullName.firstName").isLength({ min: 3 })
            .withMessage("firstName must be atleast 3 charecter long"),
        body("vehicleDetails.vehicleNo").isEmpty()
            .withMessage("vehicle number required"),
        body("vehicleDetails.vehicleColor").isEmpty()
            .withMessage("vehicle color required"),
        body("vehicleDetails.vehicleCapacity").isEmpty()
            .withMessage("vehicle number required"),
        body("vehicleDetails.vehicleType").isEmpty()
            .withMessage("vehicle type required"),
    ],
    captainController.registerCaptain
);

router.post("/captainLogin",
    [
        body("email").isEmail().withMessage("invalid email"),
        body("password").isLength({ min: 6 })
            .withMessage("password must be atleast 6 character long"),
    ],
    captainController.loginCaptain
);

router.get("/captainLogout", authMiddleware.authCaptain, captainController.logoutCaptain);

router.get("/captainProfle", authMiddleware.authCaptain, captainController.profileCaptain);


module.exports = router;