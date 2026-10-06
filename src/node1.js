const express = require("express");
const connectDB = require("./config/Database");
const User = require("./Model/User");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
    console.log("Request", req.body);

    const user = new User(req.body);

    try {
        await user.save();
        res.send("User has been added successfully");
    } catch (err) {
        res.status(400).send("There is an Error: " + err.message);
    }
});

connectDB()
    .then(() => {
        console.log("The Database connection has been successful");
        app.listen(7777, () => {
            console.log("The Server is Listening !!!");
        });
    })
    .catch((err) => {
        console.log("The DB is not Connected", err);
    });