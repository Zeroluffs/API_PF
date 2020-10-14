const User = require("../models/User");
const Student = require("../models/Student");
const express = require("express");

const studentCtrl = {};

studentCtrl.getAllStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};

studentCtrl.getStudent = async (req, res) => {
  const student = await Student.findById(req.params.id).populate("history");
  res.json(student);
};

studentCtrl.makePassword = async (req, res) => {
  const { email, password } = req.body;
  const student = await Student.findOne({ email });
  if (!student) {
    return res.status(401).send("Email does not exist");
  }
  const info = {
    password: req.body.password,
  };
  console.log(student._id)
  await Student.findByIdAndUpdate(student._id, { $set: info }, { new: true });
  res.json({
    status: "Password Assigned",
  });
};

studentCtrl.getBestOfStudent = async (req, res) => {
  const student = await Student.findById(req.params.id).populate("history");
  const test2 = [];
  for (i = 0; i < student.history.length; i++) {
    const n = student.history;
    if (n[i].level == req.params.level) {
      test2.push(n[i]);
    }
  }
  //test2.sort((a, b) => (Number(a.score) < Number(b.score) ? 1 : Number(b.score) < Number(a.score) ? -1 : 0));

  const compare = function (a, b) {
    return parseInt(b.score) - parseInt(a.score);
  };

  const final = test2.sort(compare);
  //console.log(test2.sort(compare))
  //console.log(final[0])
  const bestScore = final[0];
  res.send(final);
};

module.exports = studentCtrl;
