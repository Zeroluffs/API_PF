const User = require("../models/User");
const Student = require("../models/Student");
const Professor = require("../models/Professor");
const express = require("express");
const bcrypt = require("bcrypt");

const professorCtrl = {};

professorCtrl.getUsers = async (req, res) => {
  const users = await Professor.find();
  res.json(users);
};

professorCtrl.createUser = (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const professor = new Professor({
        name: req.body.name,
        password: hashedPassword,
        email: req.body.email,
    });
    professor.save()
    .then((user) => {
      res.send(professor._id);
    })
    .catch((error) => {
      console.log(error);
      res.send(400, "Email is already in use");
    });
};

professorCtrl.logIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await Professor.findOne({ email });
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

module.exports = professorCtrl;
