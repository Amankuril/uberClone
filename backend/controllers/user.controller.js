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

    if(findUser){
       return res.status(400).json("user already exists");
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


    res.status(201).json({ token, user });
}

module.exports.loginUser = async (req, res) => {
    res.send("login");
}

module.exports.logoutUser = async (req, res) => {
    res.send("logout");
}

module.exports.profileUser = async (req, res) => {
    res.send("profile");
}