const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectToDb = require("./DB/db.js");
const userRoute = require("./routes/user.route.js");

connectToDb();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/users", userRoute);

app.get("/", (req, res) => {
    res.send("example request");
});


module.exports = app;