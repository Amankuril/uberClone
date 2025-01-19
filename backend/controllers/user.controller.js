const userModel = require("../models/user.model.js");
const userService = require("../services/user.service.js");
const { validationResult } = require("express-validator");



module.exports.registerUser = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    const { fullName, email, password } = req.body;

    const findUser = await userModel.findOne({ email });

    if (findUser) {
        return res.status(400).json({ message: "user already exists" });
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        fullName: {
            firstName: fullName.firstName,
            lastName: fullName.lastName
        },
        email,
        password: hashedPassword
    });

    // console.log(user);

    const token = await user.generateAuthToken();

    res.cookie('token', token);

    res.status(201).json({ token, user });
}

module.exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.array()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
        return res.status(401).json({ message: "invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        res.status(401).json({ message: "invalid email or password" });
    }

    const token = await user.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ token, user });

}

module.exports.logoutUser = async (req, res) => {
    res.send("logout");
}

module.exports.userProfile = async (req, res) => {

    res.status(200).json(req.user);
}