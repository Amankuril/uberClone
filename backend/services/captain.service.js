const captainModel = require("../models/captain.model.js");

module.exports.createCaptain = async ({
    fullName, email, password, vehicleDetails
}) => {

    if (
        !fullName.firstName ||
        !email || !password ||
        !vehicleDetails.vehicleNo ||
        !vehicleDetails.vehicleCapacity ||
        !vehicleDetails.vehicleType ||
        !vehicleDetails.vehicleColor
    ) {
        throw new Error("All fields are required");
    }

    const newCaptain = await captainModel.create({
        fullName: {
            firstName: fullName.firstName,
            lastName: fullName.lastName,
        },

        email,
        password,

        vehicleDetails: {
            vehicleColor: vehicleDetails.vehicleColor,
            vehicleCapacity: vehicleDetails.vehicleCapacity,
            vehicleNo: vehicleDetails.vehicleNo,
            vehicleType: vehicleDetails.vehicleType
        }
    });

    return newCaptain;
}