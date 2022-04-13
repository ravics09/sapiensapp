const express = require("express");
const userRoutes = express.Router();
const userController = require("./../controllers/userController");

userRoutes.get("/getprofile/:id", getProfile);
userRoutes.put("/settheme/:id", setTheme);
userRoutes.post("/register", register);
userRoutes.post("/login", login);

function getProfile(req, res) {
  userController.getProfile(req, res);
}

function setTheme(req, res) {
  userController.setTheme(req, res);
}

function register(req, res) {
  userController.register(req, res);
}

function login(req, res) {
  userController.login(req, res);
}

module.exports = userRoutes;
