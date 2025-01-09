const userModel = require("../models/user.model.js");


module.exports.createUser = async ({
    fullName, email, password
}) => {

    if(!fullName.firstName || !email || !password){
        throw new Error("all fields are required");
    }

    const newUser = userModel.create({
        fullName : {
            firstName : fullName.firstName,
            lastName : fullName.lastName,
        },
        email,

        password
    });

    return newUser;
}