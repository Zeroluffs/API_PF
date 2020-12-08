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

professorCtrl.createUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const professor = new Professor({
    name: req.body.name,
    password: hashedPassword,
    email: req.body.email,
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
professorCtrl.addStudent = async (req, res) => {
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
    nrc: req.body.nrc,
    professor_id: req.params.id,
    user_id: user._id,
  });
  await user.save();
  await student.save();
  await Professor.findByIdAndUpdate(
    req.params.id,
    { $push: { student: student } },
    { new: true, useFindAndModify: false }
  );
  res.send("Student Added");
};

professorCtrl.getStudents = async (req, res) => {
  const student = await Professor.findById(req.params.id).populate("student");
  const students = student.student;
  res.json(students);
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

professorCtrl.deleteStudent = async (req, res) => {
  await User.findByIdAndRemove(req.params.studentID);
  await Student.findByIdAndRemove(req.params.studentID);
  await Professor.findByIdAndUpdate(
    req.params.id,
    { $pull: { student: req.params.studentID } },
    { new: true }
  );
};

module.exports = professorCtrl;
