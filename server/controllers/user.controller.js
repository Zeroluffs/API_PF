const User = require("../models/User");
const Student = require("../models/Student");
const express = require("express");

const userCtrl = {};

userCtrl.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

userCtrl.createUser = async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const student = new Student({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  await student.save();
  await user.save();
  res.send(student._id)
};

userCtrl.logIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).send("Email or password does not exist");
  }

  //validates  hashed password in database with the one you just sent

  res.json({
    status: "you are logged",
  });
};


module.exports = userCtrl;
