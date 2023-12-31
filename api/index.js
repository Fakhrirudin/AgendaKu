const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");

const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

mongoose
    .connect("mongodb+srv://fakhri:fakhri@cluster0.0hkpgck.mongodb.net/")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB", error);
    });

app.listen(port, () => {
    console.log("Server is Running on port 3000");
});

const User = require("./models/user");
const Todo = require("./models/todo");

app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //cek email sudah register
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("Email already registered")
        }

        const newUser = new User({
            name, email, password
        });

        await newUser.save();

        res.status(202).json({ message: "User Registered Successfully" })
    } catch (error) {
        console.log("Error registering the user", error);
        res.status(500).json({ message: "Registration Failed" });
    }
});

const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");

    return secretKey;
}
const secretKey = generateSecretKey();

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email});
        if (!user) {
            return res.status(401).json({message:"Invalid Email"})
        }

        if (user.password !== password) {
            return res.status(401).json({message:"Invalid Password"})
        }

        const token = jwt.sign({ userId: user._id }, secretKey);

        res.status(200).json((token))
    } catch (error) {
        console.log("Login Failed", error);
        res.status(500).json({message:"Login Failed"})
    }
})