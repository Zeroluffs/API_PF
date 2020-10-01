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

studentCtrl.getBestOfStudent = async (req, res) => {
  const student = await Student.findById(req.params.id).populate("history");
  const test2 = [];
  for (i = 0; i < student.history.length; i++) {
    const n = student.history;
    if (n[i].level == req.params.level) {
      test2.push(n[i]);
    }
  }
  test2.sort((a,b) => (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0)); 

  const bestScore = test2[0]
  res.send(bestScore);
};

module.exports = studentCtrl;
