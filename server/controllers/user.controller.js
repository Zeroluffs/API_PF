const User = require("../models/User");
const Student = require("../models/Student");
const express = require("express");

const userCtrl = {};

userCtrl.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

userCtrl.createUser = (req, res) => {
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
  user
    .save()
    .then((user) => {
      student.save();
      res.send(student._id);
    })
    .catch((error) => {
      console.log(error)
      res.send(400, "Email is already in use");
    });
};

userCtrl.logIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await Student.findOne({ email });
  if (!user) {
    return res.status(401).send("Email or password does not exist");
  }
  if (user.password != password) {
    return res.status(401).send("Email or password does not exist");
  }

  //validates  hashed password in database with the one you just sent

  res.send(user._id);
};

module.exports = userCtrl;
