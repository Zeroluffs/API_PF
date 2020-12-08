const User = require("../models/User");
const Student = require("../models/Student");
const express = require("express");
const bcrypt = require("bcrypt");

const userCtrl = {};

userCtrl.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

userCtrl.createUser = (req, res) => {
  const user = new User({
    name: req.body.name,
    code: req.body.code,
    email: req.body.email,
  });
  console.log("this is the user ID" + user._id);
  const student = new Student({
    name: req.body.name,
    code: req.body.code,
    email: req.body.email,
    user_id: user._id,
  });
  user
    .save()
    .then((user) => {
      student.save();
      res.send(student._id);
    })
    .catch((error) => {
      console.log(error);
      res.send(400, "Email is already in use");
    });
};

userCtrl.logIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await Student.findOne({ email });
  const validPass = await bcrypt.compare(password, user.password);

  if (!user) {
    return res.status(401).send("Email or password does not exist");
  }
  if (!validPass) {
    return res.status(400).send("Invalid Password");
  }

  //validates  hashed password in database with the one you just sent

  res.send(user._id);
};

module.exports = userCtrl;
