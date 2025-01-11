const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
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

    socketId: {
        type: String
    }
});


userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SCRET);
    return token;
}

userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;