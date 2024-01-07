const router = require("express").Router();

const User = require("../models/User");

router.post("/", async (req, res) => {
  try {
    const { name, email, password, imageURL } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      picture: imageURL,
    });
    res.status(201).json({
      id: user.id,
      message: "success!",
    });
  } catch (err) {
    let message;
    if (err.name === "MongoError" && err.code === 11000) {
      message = "user already exists";
    } else {
      message = `server error ${err.message}`;
    }
    console.log(err);
    res.status(400).json({ message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    user.status = "online";
    await user.save();
    res.status(200).json({
      user,
      message: "success!",
    });
  } catch (error) {
    res.status(400).json({
      message: e.message,
    });
  }
});

module.exports = router;
