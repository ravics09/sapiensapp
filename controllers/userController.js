const User = require("./../models/userModel");
const bcrypt = require("bcryptjs");

module.exports = {
  getProfile,
  setTheme,
  register,
  login,
};

async function getProfile(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(200).json({ message: "User Not Exist." });
    } else {
      res.status(200).json({ user: user });
    }
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
}

async function setTheme(req, res) {
  const { color } = req.body;
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404).json({ status: 404, message: "User Not Exist." });
  } else {
    user.themeColor = color;
    await user.save();
    res.status(200).json({
      color: color,
      status: 200,
    });
  }
}

async function register(req, res) {
  const { email, fullName, password } = req.body;
  const user = await User.findOne({ email: email });

  if (!user) {
    if (email && password) {
      bcrypt.hash(password, 12, (err, passwordHash) => {
        if (err) {
          res.status(500).send("Couldn't hash the password");
        } else if (passwordHash) {
          return User.create({
            email: email,
            fullName: fullName,
            hash: passwordHash,
          }).then(() => {
            res.status(200).json({
              message: "You have registered successfully.",
              statusCode: 200,
            });
          });
        }
      });
    }
  } else {
    res.status(409).json({ message: "User already exist." });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(404).json({
      message: "User Not Exist.",
      status: 404,
    });
  } else {
    bcrypt.compare(password, user.hash, (err, compareRes) => {
      if (err) {
        res.status(502).send("Server error while checking user password");
      } else if (compareRes) {
        res.status(200).json({
          user: user,
          status: 200,
        });
      } else {
        res.status(401).json({
          message: "Invalid Credentials! Please try again.",
          status: 401,
        });
      }
    });
  }
}
