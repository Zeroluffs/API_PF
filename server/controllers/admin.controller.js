const User = require("../models/User");
const Student = require("../models/Student");
const Professor = require("../models/Professor");
const express = require("express");
const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");
const adminCtrl = {};

adminCtrl.getUsers = async (req, res) => {
  const users = await Admin.find();
  res.json(users);
};

adminCtrl.createUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const professor = new Admin({
    name: req.body.name,
    password: hashedPassword,
    email: req.body.email,
    code: req.body.code,
    role: req.body.role,
  });
  console.log(professor);
  await professor
    .save()
    .then((user) => {
      res.send(professor._id);
    })
    .catch((error) => {
      console.log(error);
      res.send(400, "Email is already in use");
    });
};

adminCtrl.logIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await Admin.findOne({ email });
  const validPass = await bcrypt.compare(password, user.password);

  if (!user) {
    return res.status(401).send("Email or password does not exist");
  }
  if (!validPass) {
    return res.status(400).send("Invalid Password");
  }

  //validates  hashed password in database with the one you just sent
  console.log("user data" + "" + user);
  res.json({
    _id: user.id,
    role: user.role,
  });
};
module.exports = adminCtrl;
