const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({
    fullName: {

        firstName: {
            type: String,
            required: true,
            minlength: [3, "Name must be at least 3 charecter long"],
        },

        lastName: {
            type: String,
            required: true,
        }

    },

    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "Email must be at least 5 chatecter long"],
    },

    password: {
        type: String,
        required: true,
        select: false
    },

    vehicleDetails: {

        vehicleNo: {
            type: String,
            required: true,
            unique: true
        },
        vehicleType: {
            type: String,
            // enum : ["bike", "auto", "car"], TODO 
            required: true,
        },
        vehicleCapacity: {
            type: Number,
            required: true
        },
        vehicleColor: {
            type: String,
            required: true
        }
    },

    socketId: {
        type: String
    }
});


captainSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SCRET, { expiresIn: "24h" });
    return token;
}

captainSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const captainModel = mongoose.model("captain", captainSchema);

module.exports = captainModel;