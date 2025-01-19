const captainModel = require("../models/captain.model.js");
const { validationResult } = require("express-validator");
const captainController = require("../services/captain.service.js");

module.exports.registerCaptain = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, vehicleDetails } = req.body;

    const findCaptain = await captainModel.findOne({ email });
    if (findCaptain) {
        return res.status(400).json({ message: "captain already exists" });
    }

    const hashedPassword = await userModel.hashPassword(password);

    const captain = await captainController.createCaptain({
        fullName: {
            firstName: fullName.firstName,
            lastName: fullName.lastName,
        },

        email,
        password: hashedPassword,

        vehicleDetails: {
            vehicleColor: vehicleDetails.vehicleColor,
            vehicleCapacity: vehicleDetails.vehicleCapacity,
            vehicleNo: vehicleDetails.vehicleNo,
            vehicleType: vehicleDetails.vehicleType
        }
    });

    const token = await captain.generateAuthToken();

    res.cookie('token', token);

    res.status(201).json({ token, captain });
}


module.exports.loginCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email });

    if (!captain) {
        return res.sataus(400).json({ message: "invalid email or password" });
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.sataus(400).json({ message: "invalid email or password" });
    }

    const token = await user.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ token, captain });
}


module.exports.logoutCaptain = async (req, res) => {
    res.send("captain logout");
}


module.exports.profileCaptain = async (req, res) => {
    res.status(200).json(req.captain);
}